const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const db = async()=>{
    try{
      await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected successfully!");
    }
    catch(error){
        console.error("MongoDB connection error",error);
    }
}

module.exports = db;