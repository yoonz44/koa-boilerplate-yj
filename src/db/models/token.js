module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define(
        'token',
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
            type: {
                type: DataTypes.STRING(10),
            },
            token: {
                type: DataTypes.STRING(100),
            },
            createDate: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: 'token',
            timestamps: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );

    Token.associate = models => {
        models.user.hasMany(Token, {foreignKey: 'user_id', as: 'token'});
        Token.belongsTo(models.user, {foreignKey: 'user_id'});
    };

    return Token;
};
