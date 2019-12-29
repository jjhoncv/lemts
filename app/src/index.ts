import express from 'express';
import path from 'path';

import { indexRouter } from './components/index';
import { usersRouter } from './components/users';

const app: express.Application = express();

app.use(express.static(path.join(__dirname, '../../public')))

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(8080)

