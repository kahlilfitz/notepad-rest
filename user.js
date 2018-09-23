const Sequelize = require( 'sequelize' );

const sqlPath = 'mysql://api@35.197.68.122/notepad_db';
const sql = new Sequelize( sqlPath );

async function connect() {
	try {
	    let authResponse = await sql.authenticate();

	    console.log('Auth Response: ', authResponse);
	    return { message: 'Auth Success!', data: authResponse };
	} catch ( err ) {
	    console.log( 'Error!:', err )
	    return { error: `Error!:\n${err}` };
	}
}
    
exports.connect = connect;

