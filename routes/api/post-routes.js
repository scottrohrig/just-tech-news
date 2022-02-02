const router = require( 'express' ).Router();
const { User, Post } = require( '../../models' );

// get all users' posts
router.get( '/', ( req, res ) => {
    Post.findAll( {
        // query configuration
        attributes: [ 'id', 'post_url', 'title', 'created_at' ],
        order: [ [ 'created_at', 'DESC' ] ],
        include: [
            {
                model: User,
                attributes: [ 'username' ]
            }
        ]
    } )
        .then( dbPostData => res.json( dbPostData ) )
        .catch( err => {
            console.log( err );
            res.status( 500 ).json( err );
        } );
} );

// get a single post
router.get( '/:id', ( req, res ) => {
    Post.findOne( {
        where: { id: req.params.id },
        attributes: [ 'id', 'post_url', 'title', 'created_at' ],
        include: [
            {
                model: User,
                attributes: [ 'username' ]
            }
        ]
    } )
        .then( dbPostData => {
            if ( !dbPostData ) {
                res.status( 404 ).json( {
                    message: 'No Post Found'
                } );
                return;
            }
            res.json( dbPostData );
        } )
        .catch( err => {
            console.log( err );
            res.status( 500 ).json( err );
        } );
} );

// create a Post
router.post( '/', ( req, res ) => {
    // expects {title: 'Post Title', post_url: 'https...', user_id: 1}
    Post.create( {
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    } )
        .then( dbPostData => res.json( dbPostData ) )
        .catch( err => {
            console.log( err );
            res.status( 500 ).json( err );
        } );
} );

// update a post's 'title'
router.put( '/:id', ( req, res ) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: { id: req.params.id }
        }
    ).then( dbPostData => {
        // validate post found
        if ( !dbPostData ) {
            res.status( 404 ).json( { message: 'No Post Found' } );
            return;
        }
        res.json( dbPostData );
    } ).catch( err => { console.log( err ); res.status( 500 ).json( err ); } );
} );

// delete a post
router.delete( '/:id', ( req, res ) => {
    Post.destroy( {
        where: { id: req.params.id }
    } )
        .then( dbPostData => {
            // validate post found
            if ( !dbPostData ) {
                res.status( 404 ).json( { message: 'No Post Found!' } );
                return;
            }
            res.status( 200 ).json( dbPostData );
        } )
        .catch( err => {
            console.log( err );
            res.status( 500 ).json( err );
        } );
} );

module.exports = router;

