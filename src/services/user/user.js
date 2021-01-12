import {Sequelize} from 'sequelize';
import {sequelize, user} from '../../db/models';
import Boom from "boom";
import {encrypt} from "../../utils";

const Op = Sequelize.Op;

class User {
    async updatePassword(data) {
        if (!data.password || (!data.email && !data.phone)) {
            throw Boom.badRequest('Invalid data');
        }

        try {
            await sequelize.transaction(async (transaction) => {
                if (!data.email) {
                    const result = await this.findEmailByPhone(data.phone);

                    if (!result) {
                        throw Boom.badRequest('not found');
                    } else {
                        data.email = result.email;
                    }
                }

                const hash = encrypt(data.email, data.password);

                await user.update({
                    password: hash,
                    updateDate: Sequelize.fn('NOW'),
                }, {
                    where: {
                        [Op.or]: [{
                            email: data.email,
                        }, {
                            phone: data.phone,
                        }],
                    },
                }, {
                    transaction,
                });
            });

            return {
                email: data.email
            }
        } catch (e) {
            throw Boom.internal(e);
        }
    }

    async updateLastLogin(email) {
        if (!email) {
            throw Boom.badRequest('Invalid data');
        }

        try {
            await sequelize.transaction(async (transaction) => {
                await user.update({
                    lastLogin: Sequelize.fn('NOW'),
                }, {
                    where: {
                        email: {
                            [Op.eq]: email,
                        },
                    },
                }, {
                    transaction,
                });
            });
        } catch (e) {
            throw Boom.internal(e);
        }
    }

    async findEmailByPhone(phone) {
        if (!phone) {
            throw Boom.badRequest('Invalid data');
        }

        try {
            return user.findOne({
                where: {
                    phone: {
                        [Op.eq]: phone
                    },
                },
                attributes: ['email']
            });
        } catch (e) {
            throw Boom.internal(e);
        }
    }

    async findByEmail(email) {
        if (!email) {
            throw Boom.badRequest('Invalid data');
        }

        try {
            return user.findOne({
                where: {
                    email: {
                        [Op.eq]: email
                    },
                },
            });
        } catch (e) {
            throw Boom.internal(e);
        }
    }

    async findById(id) {
        if (!id) {
            throw Boom.badRequest('Invalid data');
        }

        try {
            return user.findByPk(id);
        } catch (e) {
            throw Boom.internal(e);
        }
    }
}

export default new User();
