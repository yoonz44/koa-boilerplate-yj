import {Sequelize} from 'sequelize';
import Boom from "boom";
import {login_history, sequelize} from "../../db/models";

const Op = Sequelize.Op;

class LoginHistory {
    async create(data) {
        if (!data.user_id) {
            throw Boom.badRequest('Not enough data');
        }

        try {
            await sequelize.transaction(async (transaction) => {
                await login_history.create({
                    user_id: data.user_id,
                    ip: data.ip,
                    os: data.os,
                    browser: data.browser,
                }, {
                    transaction,
                });
            });

            return true;
        } catch (e) {
            throw Boom.internal(e);
        }
    };
}

export default new LoginHistory();
