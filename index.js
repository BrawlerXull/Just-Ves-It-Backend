const express = require('express');
const app = express();
require("./src/db/mongodb");
const Task = require("./src/schema/schema");
const users = require('./src/Registered Users/users.js');
app.use(express.json());

const cors = require('cors');

app.use(cors());

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

app.post("/delete", async (req, res) => {
  const taskId = req.body._id; 

    const data = await Task.deleteOne({ _id: taskId });

    res.send(data);
});

app.get('/all', async (req, res) => {
  const data = await Task.find();
  res.send(data); 
});

const server = app.listen(process.env.PORT || 5002, () => {
  console.log(`Server listening on port ${server.address().port}`);
});

const startWebSocketServer = require('./src/websocket/websocket'); // Require the WebSocket server
startWebSocketServer(server);