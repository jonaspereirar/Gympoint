import { Router } from 'express';

import SessionController from './app/controllers/AdminSessionController';
import StudentController from './app/controllers/StudentController';
import AdminController from './app/controllers/AdminController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/admin', AdminController.store);

routes.use(authMiddleware);
routes.put('/sessions', AdminController.update);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

export default routes;
