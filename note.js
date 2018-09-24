const Sequelize = require( 'sequelize' );
const { eq } = Sequelize.Op;
const SQL = require( './sql' );

const Note = SQL.define( 'note',
			 {
			     user_id: { type: Sequelize.INTEGER },
			     title: { type: Sequelize.STRING },
			     content: { type: Sequelize.TEXT('medium') }
			 }
			 );

const printErrJSON =  err => ( { error: `Error!:\n${err}` } );

const create = async ( userId, noteTitle, noteContent ) => {
    try {
	await Note.sync();

	let instNote = await Note.create({
	    user_id: userId,
	    title: noteTitle,
	    content: noteContent
	});
	return instNote.dataValues;

    } catch( err ) {
	console.log( 'Error!:', err );
	return printErrJSON( err );
    }
}

exports.create = create;

const getByUserId = async ( user_id ) => {
    try {
	await Note.sync();

	let noteData = await Note.findAll(
	    {
		where: { user_id: { [eq]:user_id } }
	    }
	);

	return noteData;
    } catch( err ) {
	return printErrJSON( err );
    }
}

exports.getByUserId = getByUserId;

const update = async ( noteId, noteTitle, noteContent ) => {
    try {
	await Note.sync();

	let updated = await Note.update(
	    {
		title: noteTitle,
		content: noteContent
	    },
	    {
		where: {
		    id: { [eq]:noteId }
		}
	    }
	);
	return { updated: updated[0] };

    } catch( err ) {
	console.log( 'Error!:', err );
	return printErrJSON( err );
    }
}

exports.update = update;
