const http = require("http");
const Express = require("express");
const app = Express();
const hostname = '127.0.0.1';
const port = 80;

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const kittySchema = new mongoose.Schema({
    Name: String,
    Email: String
  });

  const Kitten = mongoose.model('Kitten', kittySchema);

main().then(res=>console.log("db connected successfuly"));
main().catch(err => console.log("db not connected..!!!",err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Login-and-Signup');

  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.use(bodyParser.json()); // Parses JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded form data

app.get('/',(req,res)=>{
    res.send('Hello everyone');
})

app.post('/signup',(req,res)=>{
    console.log(req.body)
    const {Name,Email} = req.body
    Kitten.create({Name,Email})
    res.send('Singup successfully');
})

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`); 
})