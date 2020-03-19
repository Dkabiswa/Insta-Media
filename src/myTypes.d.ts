import { Request, Response, NextFunction } from 'express';
export type MiddlewareFn = (req: Request, res: Response, next?: NextFunction) => void;

export interface ILongLiveResponse {
  access_token: string;
  token_type: string;
  expires_in: Number;
}