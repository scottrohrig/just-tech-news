const router = require( 'express' ).Router();
const { Comment } = require( '../../models' );

// GET
router.get( '/', ( req, res ) => {
    Comment.findAll()
        .then( dbComments => res.json( dbComments ) )
        .catch( err => {
            console.log( err );
            res.status( 500 ).json( err );
        } );
} );

// POST
router.post( '/', ( req, res ) => {
    Comment.create( {
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    } )
        .then( dbComment => res.json( dbComment ) )
        .catch( err => {
            console.log( err );
            res.status( 400 ).json( err );
        } );
} );

// DELETE
router.delete( '/:id', ( req, res ) => {
    Comment.destroy( {
        where: { id: req.params.id }
    } )
        .then( dbComment => {
            // validate dbComment
            if ( !dbComment ) {
                res.status( 404 ).json( { message: 'No Comment Found' } );
                return;
            }
            res.status( 200 ).json( dbComment );
        } )
        .catch( err => {
            console.log( err );
            res.status( 500 ).json( err );
        } );
} );

module.exports = router;