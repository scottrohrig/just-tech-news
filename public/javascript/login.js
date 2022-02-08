async function signupFormHandler( event ) {
  event.preventDefault();

  // store ref to form data
  const username = document.getElementById( 'username-signup' ).value.trim();
  const email = document.getElementById( 'email-signup' ).value.trim();
  const password = document.getElementById( 'password-signup' ).value.trim();

  // POST signup data to server
  if ( username && email && password ) {
    const response = await fetch( '/api/users', {
      method: 'post',
      body: JSON.stringify( {
        username,
        email,
        password
      } ),
      headers: { 'Content-type': 'application/json' }
    } );

    if ( response.ok ) {
      console.log( response );
    } else {
      alert( response.statusText );
    }
  }
}

async function loginFormHandler( event ) {
  event.preventDefault();

  const email = document.getElementById( 'email-login' ).value.trim();
  const password = document.getElementById( 'password-login' ).value.trim();

  if ( !email || !password ) { return; }

  const response = await fetch( '/api/users/login', {
    method: 'post',
    body: JSON.stringify( { email, password } ),
    headers: { 'Content-Type': 'application/json' }
  } );

  if ( response.ok ) {
    document.location.replace( '/' );
  } else {
    alert( response.statusText );
  }
}

document.querySelector( '.login-form' ).addEventListener( 'submit', loginFormHandler );

document.querySelector( '.signup-form' ).addEventListener( 'submit', signupFormHandler );
