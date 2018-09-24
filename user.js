const Sequelize = require( 'sequelize' );
const { eq } = Sequelize.Op;
const SQL = require( './sql' );

const User = SQL.define( 'user',
			 {
			     username: { type: Sequelize.STRING, unique: true },
			     password: { type: Sequelize.STRING }
			 }
		       );

const printErrJSON =  err => ( { error: `Error!:\n${err}` } );

const connect = async () => {
	try {
	    let authResponse = await sql.authenticate();

	    console.log('Auth Response: ', authResponse);
	    return { message: 'Auth Success!', data: authResponse };
	} catch ( err ) {
	    console.log( 'Error!:', err );
	    return { error: `Error!:\n${err}` };
	}
}

exports.connect = connect;

const create = async ( username, password ) => {
    try {
	console.log( 'CREATE, User.sync() started' );
	await User.sync();
	console.log( 'CREATE, User.sync() ended' );
	let instUser = await User.create({
	    username,
	    password
	});
	console.log( 'CREATE, User.create() ended' );
	console.log( 'User created:\n', instUser ); 
	return instUser.dataValues;
    } catch( err ) {
	console.log( 'CREATE ERROR:\n', err );
	return printErrJSON( err );
    }
}

exports.create = create;

const read = async ( username, password ) => {
    try {
	await User.sync();
	
	let instUser = await User.findOne(
	    {
		where: {
		    username: { [eq]:username },
		    password: { [eq]:password }
		}
	    }
	);
	console.log ( 'READ User:\n', instUser );
	return instUser ?
	    instUser.dataValues
	    : { error: 'User or password is incorrect!' };
    } catch( err ) {
	return printErrJSON( err );
    }
}

exports.read = read;

