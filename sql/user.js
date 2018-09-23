const Sequelize = require( 'sequelize' );

const sqlPath = 'mysql://root:allturtles@35.185.243.51'
const sql = new Sequelize( sqlPath );

exports.User = {
    connect: async () => {
	try {
	    const authPromise = sql.authenticate();
	    const authResponse = await authPromise;

	    console.log('Auth Response: ', authResponse);
	} catch ( err ) {
	    console.log( 'Error!:', err )
	}
    }
}
