import axios from 'axios';
import qs from 'querystring';
import { setAsync } from '../cache/redisCache';
import environment from '../config/environment';

class AccessTokenController {
  displayAuthWindow(_req, res, _next) {
    const url = 'https://api.instagram.com/oauth/authorize';
    const appId = environment.APPID;
    const redirectUrl = environment.REDIRECTURL;
    const scope = 'user_profile,user_media';
    res.redirect(`${url}?client_id=${appId}&redirect_uri=${redirectUrl}&scope=${scope}&response_type=code`);
  }

  static async getLongLivedCode(code){
    const appSecret = environment.APPSECRET;
    const url = 'https://graph.instagram.com/access_token';
    const type = 'ig_exchange_token'
    const response = await axios.get(`${url}?grant_type=${type}&client_secret=${appSecret}&access_token=${code}`);
    return response.data;
  }

  async getShortAccesToken(req, res, _next) {
    const appId = environment.APPID;
    const redirectUrl = environment.REDIRECTURL;
    const appSecret = environment.APPSECRET;
    const { code } = req.query;
    if(!code) {
      res.send({error: 'Error authenticating'});
    }
    const url = 'https://api.instagram.com/oauth/access_token';
    try {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      const params = {
        client_id: appId,
        client_secret: appSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUrl,
        code
      }
      const response = await axios.post(url, qs.stringify(params), config)
      const { data } = response;
      await setAsync('user_id', data.user_id);
      await setAsync('short_token', data.access_token);
      const { access_token } = await AccessTokenController.getLongLivedCode(data.access_token);
      if(access_token) {
        await setAsync('access_token', access_token);
        res.status(200).send({ message: 'access_token is succesfully set' });
      } else {
        res.status(400).send({ error: 'access_token not set' });
      }
    } catch (error) {
      res.send(error)
    }
  }
 }


 export default AccessTokenController;
