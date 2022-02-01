// Sequelize documents for model configuration 
// https://sequelize.org/v5/manual/models-definition.html#configuration
const bcrypt = require( 'bcrypt' );
const { Model, DataTypes } = require( 'sequelize' );
const sequelize = require( '../config/connection' );

// create our User model
class User extends Model { 
    async checkPassword(loginPw){
        let match = await bcrypt.compare(loginPw, this.password);
        return match
    }
 }

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
        hooks: {
            // using promises
            // beforeCreate( userData ) {
            //     bcrypt.hash( userData.password, 10 ).then( newUserData => {
            //         return newUserData;
            //     } );
            // },
            // using new async / await 
            async beforeCreate( newUserData ) {
                newUserData.password = await bcrypt.hash( newUserData.password, 10 );
                return newUserData;
            },
            async beforeUpdate( updatedUserData ) {
                updatedUserData.password = await bcrypt.hash( updatedUserData.password, 10 );
                return updatedUserData;
            }
        },
        // TABLE Configuration
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;