import axios from 'axios';
import qs from 'querystring';
import { setAsync, getAsync } from '../cache/redisCache';
// import { Request, Response, NextFunction } from 'express';

require('dotenv').config();

class AccessTokenController {
  // // appId: any
  // // appSecret: any
  // // redirectUrl: any
  // constructor() {
  //   this.appId = process.env.APPID;
  //   this.redirectUrl = process.env.REDIRECTURL;
  //   this.appSecret = process.env.APPSECRET;
  // }

  displayAuthWindow(_req, res, _next) {
    const url = 'https://api.instagram.com/oauth/authorize';
    const appId = process.env.APPID;
    const redirectUrl = process.env.REDIRECTURL;
    const scope = 'user_profile,user_media';
    res.redirect(`${url}?client_id=${appId}&redirect_uri=${redirectUrl}&scope=${scope}&response_type=code`);
  }

  async getLongLivedCode(code){
    const appSecret = process.env.APPSECRET;
    const url = 'https://graph.instagram.com/access_token';
    const type = 'ig_exchange_token'
    const response = await axios.get(`${url}?grant_type=${type}&client_secret=${appSecret}&access_token=${code}`);
    return response.data;
  }

  async getShortAccesToken(req, res, _next) {
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
      console.log(response.data);
      const { access_token } = await this.getLongLivedCode(response.data.access_token);
      await setAsync('access_token', access_token);
      res.send(access_token);
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  }
 }


 export default AccessTokenController;
