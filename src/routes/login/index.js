import Router from 'koa-router';
import loginRouter from './login';

const LoginRoute = new Router();

LoginRoute
    .use(loginRouter.routes());

module.exports = LoginRoute;
