import 'babel-polyfill';
import koa from 'koa';
import cors from 'kcors';
import logger from 'koa-logger';
import koaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';
import Boom from 'boom';
import jwt from 'koa-jwt';

import {serverPort} from './config';
import loadRoutes from './routes';
import db from './db/models';

// app
const app = new koa();

// routes
const router = new koaRouter();
router.use('/api', loadRoutes.routes());

if (process.env.NODE_ENV === 'development') {
    const corsOptions = {
        credentials: true,
        origin: '*',
    };
    app.use(cors(corsOptions));
}

app
    .use(bodyParser())
    .use(
        jwt({
            secret: process.env.JWT_KEY,
            key: 'redate_token',
        }).unless({
            path: ['/api', /\/api\/login*/],
        }),
    )
    .use(logger())
    .use(router.routes())
    .use(
        router.allowedMethods({
            throw: true,
            notImplemented: () => new Boom.notImplemented(),
            methodNotAllowed: () => new Boom.methodNotAllowed(),
        }),
    )
    .use(async (ctx, next) => {
        ctx.body = 'INSIDE API';
        await next();
    });

// server
const server = app.listen(serverPort, () => {
    db.sequelize.sync();
    process.env.NODE_PATH = __dirname;
    console.log(`Server started on port ${serverPort}`);
});

module.exports = server;
