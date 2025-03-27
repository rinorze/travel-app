import mongoose from "mongoose";

const connectDB = async () => {
  // it helps to continue with the execution of the code but when it needs it comes to the async == fetch
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // if the app is cracked it shut down the app
  }
};

export default connectDB;
