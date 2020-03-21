import axios from 'axios';
import qs from 'querystring';
import { setAsync } from '../cache/redisCache';

require('dotenv').config();

class AccessTokenController {
  displayAuthWindow(_req:any, res:any, _next:any) {
    const url = 'https://api.instagram.com/oauth/authorize';
    const appId = process.env.APPID;
    const redirectUrl = process.env.REDIRECTURL;
    const scope = 'user_profile,user_media';
    res.redirect(`${url}?client_id=${appId}&redirect_uri=${redirectUrl}&scope=${scope}&response_type=code`);
  }

  static async getLongLivedCode(code:any){
    const appSecret = process.env.APPSECRET;
    const url = 'https://graph.instagram.com/access_token';
    const type = 'ig_exchange_token'
    const response = await axios.get(`${url}?grant_type=${type}&client_secret=${appSecret}&access_token=${code}`);
    return response.data;
  }

  async getShortAccesToken(req:any, res:any, _next:any) {
    const appId = process.env.APPID;
    const redirectUrl = process.env.REDIRECTURL;
    const appSecret = process.env.APPSECRET;
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
      await setAsync('access_token', access_token);
      res.status(200).send({ access_token });
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  }
 }


 export default AccessTokenController;
