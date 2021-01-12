import Router from 'koa-router';
import loginRoute from './login';
import userRoute from './user';

const loadRoutes = new Router();

loadRoutes
    .use('/user', userRoute.routes())
    .use('/login', loginRoute.routes());

module.exports = loadRoutes;
