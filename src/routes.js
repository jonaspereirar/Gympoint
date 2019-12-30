import { Router } from 'express';

import SessionController from './app/controllers/AdminSessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/sessions', SessionController.update);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

export default routes;
