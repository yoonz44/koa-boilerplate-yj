import Router from 'koa-router';
import {handleErrors} from '../../utils/';
import {login} from '../../services';
import {user} from '../../services';

const loginRouter = new Router();

loginRouter.post('/', async ctx => {
    try {
        ctx.body = await login.loginService.login(ctx.request.body);
    } catch (error) {
        const {status, ...body} = handleErrors(error);
        ctx.status = status;
        ctx.body = body;
    }
});

loginRouter.post('/user', async ctx => {
    try {
        const result = await login.loginService.create(ctx.request.body);

        if (result) {
            ctx.body = await login.loginService.login(ctx.request.body);
        }
    } catch (error) {
        const {status, ...body} = handleErrors(error);
        ctx.status = status;
        ctx.body = body;
    }
});

loginRouter.get('/find-email/:phone', async ctx => {
    try {
        const result = await user.userService.findEmailByPhone(ctx.params.phone);

        if (result) {
            ctx.body = result;
        } else {
            ctx.body = "not found";
        }
    } catch (error) {
        const {status, ...body} = handleErrors(error);
        ctx.status = status;
        ctx.body = body;
    }
});

loginRouter.get('/email/:email', async ctx => {
    try {
        const result = await user.userService.findByEmail(ctx.params.email);

        ctx.body = {
            exist: result !== null
        };
    } catch (error) {
        const {status, ...body} = handleErrors(error);
        ctx.status = status;
        ctx.body = body;
    }
});

loginRouter.post('/user/password', async ctx => {
    try {
        ctx.body = await login.loginService.updatePassword(ctx.request.body);
    } catch (error) {
        const {status, ...body} = handleErrors(error);
        ctx.status = status;
        ctx.body = body;
    }
});

module.exports = loginRouter;
