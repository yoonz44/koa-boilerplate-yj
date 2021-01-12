module.exports = (sequelize, DataTypes) => {
    const LoginHistory = sequelize.define(
        'login_history',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            ip: {
                type: DataTypes.STRING(20),
            },
            os: {
                type: DataTypes.STRING(100),
            },
            browser: {
                type: DataTypes.STRING(100),
            },
            createDate: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: 'login_history',
            timestamps: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );

    return LoginHistory;
};
