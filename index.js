const express = require( 'express' );
const User = require( './user');
const Note = require( './note' );
const bodyParser = require( 'body-parser' );
const app = express();
const port = process.env.PORT || 3001;

app.use( (req, res, next) => {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header(
	"Access-Control-Allow-Headers",
	"Origin, X-Requested-With, Content-Type, Accept, 'application/json'"
    );
    res.header( "Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT" );
    next();
});

app.use( bodyParser.json() );

app.get( '/', ( req, res ) => {
    res.send('\n\nHello, world!\n\n');
});

// GET to see if sequelize can connect
app.get( '/connect', async ( req, res ) => {
    let resJson = await User.connect();
    console.log( 'Response JSON\n:', resJson );
    res.json( resJson );
});

app.get( '/user/:userId/notes', async ( req, res) => {
    const { userId } = req.params;
    let resJson = await Note.getByUserId( userId );
    res.json( resJson );
});

app.post( '/user' , async ( req, res ) => {
    console.log( 'POST /user' );
    const { username, password } = req.body;
    
    let resJson = await User.create( username, password );
    res.json( resJson );
});

app.post( '/session' , async ( req, res ) => {
    console.log( 'POST /session' );
    
    const { username, password } = req.body;
    
    let resJson = await User.read( username, password );
    res.json( resJson );
});

app.post( '/note', async ( req, res ) => {
    const { userId, noteTitle, noteContent } = req.body;
    let resJson = await Note.create( userId, noteTitle, noteContent );
    res.json( resJson );
});

app.put( '/note/:noteId', async ( req, res ) => {
    const { noteTitle, noteContent } = req.body;
    let resJson = await Note.update ( req.params.noteId, noteTitle, noteContent );
    res.json( resJson );
});

app.listen( port, () => {
    console.log(`listening on port ${ port }`);
});
