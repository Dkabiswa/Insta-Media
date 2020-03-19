import express from 'express';

const server = express();

server.use('/_healthcheck', (_req, res) => {
  res.status(200).json({ uptime: process.uptime() });
});

server.listen(4004, () => { console.log('Running at localhost:4004') })