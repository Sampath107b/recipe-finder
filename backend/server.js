const express=require('express');
const app=express();
const connectDB=require('./config/db');
const colors=require('colors');
const cors=require('cors');
require('dotenv').config();
connectDB();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use('/api/users',require('./routes/userRoutes'));

app.listen(PORT,()=> console.log(`server is running on port ${PORT}`.yellow.bold));