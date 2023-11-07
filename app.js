if(process.env.NODE_ENV !== "production")
{
    require("dotenv").config();
}
const mongoose = require('mongoose');


main().then(res => console.log("db connected successfuly"));
main().catch(err => console.log("db not connected..!!!", err));

async function main() {
  await mongoose.connect(process.env.DB);


  
}



const Express = require("express");
const app = Express();

const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');





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