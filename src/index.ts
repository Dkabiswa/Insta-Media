import express from 'express';
import authRouter from './auth';
import mediaRouter from './media';
import schedule from './helpers/scheduler';

const server = express();
const apiPrefix = '/api/v1';

server.use('/_healthcheck', (_req, res) => {
  res.status(200).json({ uptime: process.uptime() });
});

server.use(apiPrefix, authRouter);
server.use(apiPrefix, mediaRouter);

//schedule refresh token
schedule.scheduleRefreshToken('0 0 30 * *');

// catch all routers
server.use('*', (_req, res) => res.status(404).json({
  message: 'Not found on /api/v1'
}));

server.listen(process.env.PORT || 4004, () => { console.log('Running at localhost:4004') })