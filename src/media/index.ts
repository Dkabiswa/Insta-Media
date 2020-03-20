import express from 'express';
import MediaController from './media';

const mediaRouter = express.Router();
const mediaController = new MediaController()

mediaRouter.get('/media', mediaController.getMedia);


export default mediaRouter;