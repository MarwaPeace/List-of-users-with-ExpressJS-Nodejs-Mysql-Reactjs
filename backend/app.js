const express = require('express');
const app = express();
const morgan = require('morgan');
//Intergiciel d'analyse de corps Node.js.
//Analysez les corps de requête entrants dans un 
//middleware avant vos gestionnaires, disponibles 
//sous la req.bodypropriété.
const bodyParser = require('body-parser');
const cors = require('cors');

//IMPORT ROUTES
const todos = require('./routes/todoRoutes');


//MIDDLEWARE

app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cors());

//ROUTE MIDDLEWARE

app.use('/api', todos)




//PORT
const port = 8000;
app.listen(port,()=>{
    console.log(`Server  running on port ${port} `);
})