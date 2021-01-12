module.exports = (sequelize, DataTypes) => {
    const WordNote = sequelize.define(
        'word_note',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            word: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        {
            tableName: 'word_note',
            timestamps: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );

    return WordNote;
};
