import {Sequelize} from 'sequelize';
import {encrypt} from '../../utils';
import {createJwtToken} from "../auth";
import {sequelize, user} from '../../db/models';
import Boom from "boom";
import nickNameMaker from "../../utils/nickNameMaker";
import userService from '../user/user';
import loginHistoryService from './login_history';

const Op = Sequelize.Op;

class Login {
    async login(data) {
        if (!data.email || !data.password) {
            throw Boom.badRequest('Not enough data');
        }

        const hash = await encrypt(data.email, data.password);
        const userInfo = await user.findOne({
            where: {
                email: {
                    [Op.eq]: data.email,
                },
                password: {
                    [Op.eq]: hash,
                },
            },
        });

        if (userInfo) {
            await userService.updateLastLogin(data.email);
            await loginHistoryService.create({
                user_id: userInfo.id,
                ip: data.ip,
                os: data.os,
                broswer: data.broswer,
            })
        }

        const jwt = await createJwtToken(userInfo);

        return {
            token: jwt,
        };
    };

    async create(data) {
        if (!data.email || !data.password || data.marketing_agree === undefined) {
            throw Boom.badRequest('Not enough data');
        }

        const hash = encrypt(data.email, data.password);
        const tempNick = await nickNameMaker();

        try {
            await sequelize.transaction(async (transaction) => {
                await user.create({
                    email: data.email,
                    password: hash,
                    marketing_agree: data.marketing_agree,
                    nickName: tempNick,
                    state: 0,
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

export default new Login();
