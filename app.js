if(process.env.NODE_ENV !== "production")
{
    require("dotenv").config();
}




const Express = require("express");
const app = Express();

const port = 80;

const bodyParser = require('body-parser');



require('./src/config/database');

const my_routes = require('./src/routes/user_routes/users_routes/index');


app.use(bodyParser.json()); // Parses JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded form data

app.get('/',(req,res)=>{
    res.send('Hello everyone');
})

app.use('/',my_routes);

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`); 
})