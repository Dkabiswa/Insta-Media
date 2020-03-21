import axios from 'axios';
import { getAsync } from '../cache/redisCache';

require('dotenv').config();

class MediaController {
  async getMedia(_req:any, res:any, _next:any) {
    try {
      // const url = 'https://graph.instagram.com/';
      const user_id = await getAsync('user_id');
      // const fields = 'id,media_type,media_url,thumbnail_url';
      // const response = await axios.get(`https://graph.instagram.com/${user_id}/media?fields=id,media_type,media_url,thumbnail_url&access_token=${access_token}`);
      const response = await axios.get(`https://graph.instagram.com/${user_id}/media?fields=id,media_type,media_url,thumbnail_url&access_token=`);
      const { data } = response.data;
      res.status(200).send({ data })
    } catch (error) {
      console.log(error)
      res.send(error)
    }
    
    
  }

  // async getEmbeddedHtml(code:any){
  async getEmbeddedHtml(code:any){
    // const appSecret = process.env.APPSECRET;
    // const url = 'https://api.instagram.com/oembed?url=';
    // const type = 'ig_exchange_token'
    // const response = await axios.get(`${url}${mediaUrl}`);
    // return response.data;
    return "EmbededHTML"+code;
  }
 }


 export default MediaController;
