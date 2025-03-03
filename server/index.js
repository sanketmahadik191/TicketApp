const express = require('express');
const db = require('./config/db');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const requestLogger = require('./middleware/loggerMiddleware');
const cors = require("cors");


db();
app.use(express.json());
app.use(requestLogger)
app.use(cors());

app.use('/api/auth',authRoutes);
app.use('/api/user', userRoutes); // Now properly included
app.use('/api/ticket', ticketRoutes); // Now properly included

app.get("/", (req, res) => {
    res.send("Success!"); // Use res.send() instead of return
  });

app.listen(8080,()=>{
    console.log("DB conneted");  
})

