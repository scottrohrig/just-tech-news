async function logout() {
  const response = await fetch( '/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  } );
  console.log( response );
  if ( response.ok ) {
    document.location.replace( '/' );
  } else {
    alert( response.statusText );
  }
}

document.getElementById( 'logout' ).addEventListener( 'click', logout );
