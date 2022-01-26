// Sequelize documents for model configuration 
// https://sequelize.org/v5/manual/models-definition.html#configuration
const { Model, DataTypes } = require( 'sequelize' );
const sequelize = require( '../config/connection' );

// create our User model
class User extends Model { }

// define table columns and configuration
User.init(
    {
        // TABLE Columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [ 4 ] // at least 4 characters
            }
        },
    },
    {
        // TABLE Configuration
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;