import { Router } from 'express';

import UserController from './app/controllers/UserController';
// import User from './app/models/User';

const routes = new Router();

// routes.get('/', async (req, res) => {
//   const user = await User.create({
//     name: 'Wallace Bescrovaine ',
//     email: 'Wallace@bescrovaine.com',
//     password_hash: '123456789',
//   });

//   return res.json(user);
// });

routes.post('/users', UserController.store);

export default routes;
