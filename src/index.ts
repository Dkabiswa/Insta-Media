import express from 'express';
import authRouter from './auth';
import mediaRouter from './media';

const server = express();
const apiPrefix = '/api/v1';

server.use('/_healthcheck', (_req, res) => {
  res.status(200).json({ uptime: process.uptime() });
});


// const refreshLongLivedCode = async (code: string) => {
//   const url = 'https://graph.instagram.com/refresh_access_token'
//   const type = 'ig_refresh_token'
//   const response = await axios.get(`${url}?grant_type=${type}&access_token=${code}`);
//   console.log(response)
// }
server.use(apiPrefix, authRouter);
server.use(apiPrefix, mediaRouter);

// catch all routers
server.use('*', (_req, res) => res.status(404).json({
  message: 'Not found on /api/v1'
}));

server.listen(process.env.PORT || 4004, () => { console.log('Running at localhost:4004') })