// libraries
const path = require( "path" );
const express = require( "express" );
const exphbs = require( "express-handlebars" );

// app modules
const routes = require( "./controllers" );
const sequelize = require( "./config/connection" );

// setup app properties
const app = express();
const PORT = process.env.PORT || 3001;

// create a session
// use the session

// setup handlebars configuration
const hbs = exphbs.create( {} );

// configure the template engine
app.engine( "handlebars", hbs.engine );
app.set( "view engine", "handlebars" );

// connect middleware
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.static( path.join( __dirname, "public" ) ) );

// turn on routes
app.use( "/", routes );

// turn on connection to db && server
sequelize.sync( { force: false } ).then( () => {
    app.listen( PORT, () => console.log( `Listening on port ${ PORT }` ) );
} );
