import { Router, Request, Response } from 'express';
// import { sql } from '../../../helpers/mysql'
const routes: Router = Router();

routes.get('/', async (request: Request, response: Response) => {
  // const results = await sql.query("SHOW tables");
  // response.json(results);
});

export const router: Router = routes;
