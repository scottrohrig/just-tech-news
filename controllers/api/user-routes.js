const router = require( 'express' ).Router();
// import User Model
const { User, Post, Vote, Comment } = require( '../../models' );
const { catchErrors } = require( '../../utils/helpers' )

// GET /api/users
router.get( '/', ( req, res ) => {
    User
        .findAll( {
            attributes: { exclude: [ 'password' ] }
        } )
        .then( ( userData ) => res.json( userData ) )
        .catch( err => catchErrors( err, res ) );
} );

// GET /api/users/1
router.get( '/:id', ( req, res ) => {
    User
        .findOne( {
            attributes: { exclude: [ 'password' ] },
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Post,
                    attributes: [ 'id', 'title', 'post_url', ]
                },
                {
                    model: Comment,
                    attributes: [ 'id', 'comment_text', 'created_at' ],
                    include: {
                        model: User,
                        attributes: [ 'username' ]
                    }
                },
                {
                    model: Post,
                    attributes: [ 'title' ],
                    through: Vote,
                    as: 'voted_posts'
                }
            ]
        } )
        .then( userData => {
            if ( !userData ) {
                res.status( 404 ).json( { message: 'No User Found' } );
                return;
            }
            res.json( userData );
        } )
        .catch( err => catchErrors( err, res ) );
} );

// POST /api/users
router.post( '/', ( req, res ) => {
    const { username, email, password } = req.body;
    User
        .create( {
            username,
            email,
            password
        } )
        .then( newUser => {
            req.session.save( () => {
                req.session.user_id = newUser.id;
                req.session.username = newUser.username;
                req.session.loggedIn = true;

                res.status( 204 ).json( { user: newUser, message: 'You are logged in!' } );
            } );
        } )
        .catch( err => catchErrors( err, res ) );

} );

// login
router.post( '/login', ( req, res ) => {
    User.findOne( {
        where: {
            email: req.body.email
        }
    } ).then( dbUserData => {
        if ( !dbUserData ) {
            res.status( 400 ).json( { message: 'No user with that email address!' } );
            return;
        }

        // res.json( { user: dbUserData } );

        // verify user
        dbUserData.checkPassword( req.body.password
        ).then( match => {
            if ( !match ) {
                res.status( 400 ).json( { message: 'Incorrect password!' } );
                return;
            }

            req.session.save( () => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json( { user: dbUserData, message: 'You are logged in!' } );
            } )

        } );

    } );
} )

// logout
router.post( '/logout', ( req, res ) => {
    if ( req.session.loggedIn ) {
        req.session.destroy( () => {
            res.status( 204 ).end();
        } );
    } else {
        res.status( 404 ).end();
    }
} )

// PUT /api/users/1
router.put( '/:id', ( req, res ) => {
    User
        .update( req.body, {
            individualHooks: true,
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
        .catch( err => catchErrors( err, res ) );

} );

// DELETE /api/users/1
router.delete( '/:id', ( req, res ) => {
    User
        .destroy( {
            where: {
                id: req.params.id
            }
        } )
        .then( userData => {
            if ( !userData ) {
                res.status( 404 ).json( { message: 'No User Found' } );
                return;
            }
            res.status( 200 ).json( userData );
        } )
        .catch( err => catchErrors( err, res ) );
} );

module.exports = router;
