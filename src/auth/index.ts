import express from 'express';
import AccessTokenController from './access_token';

const authRouter = express.Router();
const accessTokenController = new AccessTokenController()

authRouter.get('/auth', accessTokenController.displayAuthWindow);

authRouter.get('/authcode', accessTokenController.getShortAccesToken);

export default authRouter;