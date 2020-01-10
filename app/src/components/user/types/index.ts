import { Response } from 'express'
export interface IResponse extends Response {
  data: object;
  message: string;
}