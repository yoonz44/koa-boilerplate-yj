import jwt from 'jsonwebtoken';
import {createJwtToken} from "./index";

const jwtMiddleware = async (ctx, next) => {
    const token = ctx.cookies.get('redate_token');

    if (!token) {
        return next();
    }

    try {
        const decoded = await decodeToken(token);

        if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
            const { id, email } = decoded;
            const freshToken = await createJwtToken({ id, email });
            ctx.cookies.set('redate_token', freshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
            });
        }

        ctx.request.user = decoded;
    } catch (e) {
        ctx.request.user = null;
    }

    return next();
};

export default jwtMiddleware;

function decodeToken(token) {
    return new Promise(
        (resolve, reject) => {
            jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                if (error) {
                    reject(error);
                }

                resolve(decoded);
            })
        }
    );
}
