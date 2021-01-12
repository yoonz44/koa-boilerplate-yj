module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: DataTypes.STRING(50),
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING(100),
            },
            nickName: {
                type: DataTypes.STRING(100),
            },
            name: {
                type: DataTypes.STRING(50),
            },
            phone: {
                type: DataTypes.STRING(20),
            },
            code: {
                type: DataTypes.STRING(100),
            },
            marketing_agree: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            state: {
                type: DataTypes.TINYINT,
            },
            lastLogin: {
                type: DataTypes.DATE,
            },
            createDate: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updateDate: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            deleteDate: {
                type: DataTypes.DATE,
            },
        },
        {
            tableName: 'user',
            timestamps: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );

    return User;
};
