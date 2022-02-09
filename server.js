// libraries
const path = require( "path" );
const express = require( "express" );
const exphbs = require( "express-handlebars" );
const session = require( 'express-session' )

// app modules
const routes = require( "./controllers" );
const sequelize = require( "./config/connection" );
const SequilizeStore = require( 'connect-session-sequelize' )( session.Store )

const helpers = require( './utils/helpers' )

// setup app properties
const app = express();
const PORT = process.env.PORT || 3001;

// create a session
const sess = {
    secret: process.env.SESS_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequilizeStore( {
        db: sequelize
    } )
}
// use the session
app.use( session( sess ) )

// setup handlebars configuration
const hbs = exphbs.create( { helpers } );

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
