var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'todolist'
});

 //open the mysql connection
db.connect(error => {

    if(error) throw error;
    console.log("DB connected");

});

module.exports = db;
