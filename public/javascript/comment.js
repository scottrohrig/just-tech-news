// asynchronous function to handle submit event on textarea
async function commentFormHandler( event ) {
  event.preventDefault();

  const comment_text = document.querySelector(
    'textarea[name="comment-body"]' ).value.trim();

  const parsedUrl = window.location.toString().split( '/' );
  const post_id = parsedUrl[ parsedUrl.length - 1 ];

  console.log( 'Commented...', event.target, comment_text, post_id );

  if ( comment_text ) {
    const response = await fetch( '/api/comments', {
      method: 'post',
      body: JSON.stringify( {
        comment_text,
        post_id
      } ),
      headers: { 'Content-type': 'application/json' }
    } );

    if ( response.ok ) {
      document.location.reload();
    } else {
      alert( response.statusText );
    }
  }

}

// event listener
document.querySelector( '.comment-form' ).addEventListener( 'submit', commentFormHandler );
