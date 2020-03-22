import axios from 'axios';
import { getAsync } from '../cache/redisCache';

require('dotenv').config();

class MediaController {
  async getMedia(_req, res, _next) {
    try {
      const url = 'https://graph.instagram.com/';
      const user_id = await getAsync('user_id');
      const access_token = await getAsync('access_token');
      const fields = 'id,media_type,media_url,thumbnail_url';
      const response = await axios.get(`https://graph.instagram.com/${user_id}/media?fields=id,media_type,media_url,thumbnail_url&access_token=${access_token}`);
      if(response) {
        res.status(200).send({ data: response.data })
      }
      res.status(400).send({ error: 'data not returned '})
    } catch (error) {
      res.send(error)
    }
    
    
  }

  async getEmbeddedHtml(code){
    const appSecret = process.env.APPSECRET;
    const url = 'https://api.instagram.com/oembed?url=';
    const type = 'ig_exchange_token'
    const response = await axios.get(`${url}${mediaUrl}`);
    return response.data;
  }
 }


 export default MediaController;
