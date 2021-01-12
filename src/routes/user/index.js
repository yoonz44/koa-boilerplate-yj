import Router from 'koa-router';
import userRouter from './user';

const UserRoute = new Router();

UserRoute
    .use(userRouter.routes());

module.exports = UserRoute;
