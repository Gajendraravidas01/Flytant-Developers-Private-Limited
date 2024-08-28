// backend/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/todo_nextjs`)
    .then(() => {
      console.log("database connected successfully!");
    }).catch((error) => {
      console.log("error in connecting to database : ",error);
    })
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
