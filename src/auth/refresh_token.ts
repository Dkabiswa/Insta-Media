import axios from 'axios';
import { getAsync, setAsync } from '../cache/redisCache';

export const refreshToken = async () =>{
  try {
    const url = 'https://graph.instagram.com/refresh_access_token'
    const type = 'ig_refresh_token'
    const access_token = await getAsync('access_token');
    const response = await axios.get(`${url}?grant_type=${type}&access_token=${access_token}`);
    const { data } = response;
    await setAsync('access_token', data.access_token);
  } catch (error) {
    console.log(error)
  }
}
