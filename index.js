const express = require( 'express' );
const  User = require( './sql/user');

const app = express();
const port = process.env.PORT || 3001;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
	"Access-Control-Allow-Headers",
	"Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get( '/', ( req, res ) => {
    res.send('\n\nHello, world!\n\n');
});

app.get( '/user', ( req, res ) => {
    User.connect();
});

app.listen(port, () => {
    console.log(`listening on port ${ port }`);
});
