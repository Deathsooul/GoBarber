import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';

// Middleware
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // tudo que vier daqui pra baixo vai passar pela authenticação

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
