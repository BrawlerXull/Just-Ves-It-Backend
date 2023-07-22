const express = require('express');
const app = express();
require("./src/db/mongodb");
const Task = require("./src/schema/schema");
const users = require('./src/Registered Users/users.js');
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.get('/users', (req, res) => {
  res.send(users);
});

app.post('/auth', (req, res) => {
    const targetValue = {"username": req.body.username, "password": req.body.password};
    const isValuePresent = users.users.filter(obj => JSON.stringify(obj) === JSON.stringify(targetValue));
    res.send({"resp" : isValuePresent});
});


app.post("/send",async(req,res)=>{
  const data = await Task.insertMany({
    description:req.body.description,
      subject:req.body.subject,
      date:req.body.date
    });
    res.send(data);
});


app.get('/all', async (req, res) => {
  const data = await Task.find();
  res.send(data); 
});

app.listen(5002,()=>console.log('listening on port 5002'));
