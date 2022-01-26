// import express, routes, sequelize 'connection'
const express = require( 'express' );
const routes = require( './routes' );
const sequelize = require( './config/connection' );

// set port
const app = express();
const PORT = process.env.PORT || 3001;

// connect middleware
app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );

// turn on routes
app.use( '/', routes );

// turn on connection to db && server
sequelize.sync( { force: false } ).then( () => {
    app.listen( PORT, () => console.log( 'Listening' ) );
} );
