import { Router } from 'express';

import SessionController from './app/controllers/AdminSessionController';
import StudentController from './app/controllers/StudentController';
import AdminController from './app/controllers/AdminController';
import PlanController from './app/controllers/PlanController';
import RegisterController from './app/controllers/RegisterController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/admin', AdminController.store);
routes.put('/sessions', AdminController.update);

routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.put('/students', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.put('/plans', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/register', RegisterController.store);
routes.get('/register', RegisterController.index);
routes.get('/register/:id', RegisterController.show);
routes.put('/register', RegisterController.update);
routes.delete('/register/:id', RegisterController.delete);

export default routes;
