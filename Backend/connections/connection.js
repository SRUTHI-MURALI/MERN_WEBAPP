import mongoose from 'mongoose';
if (process.env.ENV === 'dev') require('dotenv').config()

const connectDB =()=>{mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });} 

export default connectDB
