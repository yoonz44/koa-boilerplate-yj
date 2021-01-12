import jwt from 'jsonwebtoken';
import Boom from 'boom';

const createJwtToken = user =>
    new Promise((resolve, reject) => {
        if (!user) {
            throw Boom.badRequest('Login failed');
        }

        const token = jwt.sign(
            {
                username: user.email,
                id: user.id,
            },
            process.env.JWT_KEY,
            {
                expiresIn: '10m'
            },
        );

        if (token) {
            resolve(token);
        }

        reject('Oops! Token not created');
    });

export default createJwtToken;
