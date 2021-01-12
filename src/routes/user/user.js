import Router from 'koa-router';
import {handleErrors} from '../../utils/';
import {user} from '../../services';

const userRouter = new Router();

userRouter.get('/', async ctx => {
    try {
        const tokenData = ctx.state.redate_token;

        ctx.body = {
            user: await user.userService.findById(tokenData.id)
        };
    } catch (error) {
        const {status, ...body} = handleErrors(error);
        ctx.status = status;
        ctx.body = body;
    }
});

module.exports = userRouter;
