const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://chinmay:chinmay@tasks.rqbaptf.mongodb.net/?retryWrites=true&w=majority").then(()=>console.log("Connected to db"))