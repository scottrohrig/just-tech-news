const { Model, DataTypes } = require( 'sequelize' );
const sequelize = require( '../config/connection' );

class Vote extends Model { }


// make Vote THRU-TABLE
Vote.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        // foreign keys: add user_id and post_id fields
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        modelName: 'vote'
    }
);

module.exports = Vote;