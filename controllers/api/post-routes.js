const router = require( 'express' ).Router();
const sequelize = require( '../../config/connection' );
const { User, Post, Vote, Comment } = require( '../../models' );
const { catchErrors } = require( '../../utils/helpers' )

// get all users' posts
router.get( '/', ( req, res ) => {
    Post.findAll( {
        // query configuration
        attributes: [ 'id', 'post_url', 'title', 'created_at',
            [ sequelize.literal( '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)' ), 'vote_count' ]
        ],
        order: [ [ 'created_at', 'DESC' ] ],
        include: [
            {
                model: Comment,
                attributes: [ 'id', 'comment_text', 'post_id', 'user_id', 'created_at' ],
                include: {
                    model: User,
                    attributes: [ 'username' ]
                }
            },
            {
                model: User,
                attributes: [ 'username' ]
            }
        ]
    } )
        .then( dbPostData => res.json( dbPostData ) )
        .catch( err => catchErrors(err, res) );
} );

// get a single post
router.get( '/:id', ( req, res ) => {
    Post.findOne( {
        where: { id: req.params.id },
        attributes: [ 'id', 'post_url', 'title', 'created_at',
            [ sequelize.literal( '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)' ), 'vote_count' ]
        ],
        include: [
            {
                model: Comment,
                attributes: [ 'id', 'comment_text', 'post_id', 'user_id', 'created_at' ],
                include: {
                    model: User,
                    attributes: [ 'username' ]
                }
            },
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
        .catch( err => catchErrors(err, res) );
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
        .catch( err => catchErrors(err, res) );
} );

router.put( '/upvote', ( req, res ) => {
    // validate session
    if ( req.session ) {
        // pass destructured data
        Post
            .upvote(
                { ...req.body, user_id: req.session.user_id },
                { Vote, Comment, User }
            )
            .then( updatedPostData => res.json( updatedPostData ) )
            .catch( err => catchErrors(err, res) );
        }
} );

// update a post's 'title'
router.put( '/:id', ( req, res ) => {
    Post
        .update(
            {
                title: req.body.title
            },
            {
                where: { id: req.params.id }
            }
        )
        .then( dbPostData => {
            // validate post found
            if ( !dbPostData ) {
                res.status( 404 ).json( { message: 'No Post Found' } );
                return;
            }
            res.json( dbPostData );
        } )
        .catch( err => catchErrors(err, res) );
} );

// delete a post
router.delete( '/:id', ( req, res ) => {
    Post
        .destroy( {
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
        .catch( err => catchErrors(err, res) );
} );

module.exports = router;
