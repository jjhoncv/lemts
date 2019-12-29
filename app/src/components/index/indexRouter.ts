import { Router, Request, Response } from 'express';
import { sql } from '../../helpers/mysql'
const router: Router = Router();

router.get('/', async (request: Request, response: Response) => {
  const results = await sql.query("SHOW tables");
  response.json(results);
});

export const indexRouter: Router = router;
