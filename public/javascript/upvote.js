async function upvote( e ) {
  e.preventDefault();

  const url = window.location.toString().split( '/' );

  const id = url[ url.length - 1 ];

  const btn = e.target;

  console.log( "button clicked", btn, url, id );

  // send fetch request to server endpoint that adds a new upvote /api/posts/upvote
  const response = await fetch('/api/posts/upvote', {
    method: 'post',
    body: JSON.stringify({
      post_id: id
    }),
    headers: {'Content-Type': 'application/json'}
  })

  if (response.ok){
    // refresh the page
    document.location.reload()
  } else {
    alert(response.statusText)
  }

}

document.querySelector( '.upvote-btn' ).addEventListener( 'click', upvote );
