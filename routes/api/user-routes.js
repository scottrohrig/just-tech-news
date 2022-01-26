const router = require( 'express' ).Router();
// import User Model
const User = require( '../../models' );

// GET /api/users
router.get( '/', ( req, res ) => {
    User.findAll( {
        attributes: { exclude: [ 'password' ] }
    } )
        .then( ( userData ) => res.json( userData ) )
        .catch( err => {
            console.log( err );
            res.status( 500 ).json( err );
        } );
} );

// GET /api/users/1
router.get( '/:id', ( req, res ) => {
    User.findByPk( req.params.id, {
        attributes: { exclude: [ 'password' ] }
    } )
        .then( userData => {
            if ( !userData ) {
                res.status( 404 ).json( { message: 'No User Found' } );
                return;
            }
            res.json( userData );
        } )
        .catch( err => {
            console.log( err );
            res.status( 500 ).json( err );
        } );
} );

// POST /api/users
router.post( '/', ( req, res ) => {
    const { username, email, password } = req.body;
    User.create( {
        username,
        email,
        password
    } )
        .then( newUser => res.json( newUser ) )
        .catch( err => {
            console.log( err );
            res.status( 500 ).json( err );
        } );

} );

// PUT /api/users/1
router.put( '/:id', ( req, res ) => {
    User.update( req.body, {
        where: {
            id: req.params.id
        }
    } )
        .then( userData => {
            // validate user exists
            if ( !userData ) {
                res.status( 404 ).json( { message: 'No User Found' } );
                return;
            }
            res.json( userData );
        } )
        .catch( err => {
            console.log( err );
            res.status( 500 ).json( err );
        } );

} );

// DELETE /api/users/1
router.delete( '/:id', ( req, res ) => {
    User.destroy( {
        where: {
            id: req.params.id
        }
    } ).then( userData => {
        if ( !userData ) {
            res.status( 404 ).json( { message: 'No User Found' } );
            return;
        }
        res.status( 200 ).json( userData );
    } ).catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    } );
} );

module.exports = router;