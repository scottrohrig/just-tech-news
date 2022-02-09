module.exports = {
  format_date: date => {
    return `${ new Date( date ).getMonth() + 1
      }/${ new Date( date ).getDate()
      }/${ new Date( date ).getFullYear()
      }`;
  },
  format_plural: ( word, count ) => {
    if ( count !== 1 ) {
      return `${ word }s`;
    }
    return word;
  },
  format_url: url => {
    return url
      .replace( 'http://', '' )
      .replace( 'https://', '' )
      .replace( 'www.', '' )
      .split( '/' )[ 0 ]
      .split( '?' )[ 0 ];
  },
  catchErrors: ( err, res ) => {
    console.log( err );
    res.status( 500 ).json( { error: err, message: 'Oops, this is embarrassing. Looks like the server is having trouble.' } );
  }
};
