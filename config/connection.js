const Sequelize = require( 'sequelize' );

require( 'dotenv' ).config();

let sequelize;

if ( process.env.JAWSDB_URL ) {
  sequelize = new Sequelize( process.env.JAWSDB_URL );
  console.log( 'Server live on Heroku\n' )
} else {
  // create connection to our db
  sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  } );
  console.log( 'Server Live @ localhost\n' )
}

module.exports = sequelize;