const Sequelize = require( 'sequelize' );
const sqlPath = 'mysql://api@35.197.68.122/notepad_db';
module.exports = new Sequelize( sqlPath, { logging: console.log } );

