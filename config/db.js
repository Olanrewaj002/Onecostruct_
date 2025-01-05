import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    //console.log(⁠ MongoDB Connected: ${conn.connection.host} ⁠);

    mongoose.connection.on("error", (err) => {
      //console.error(⁠ MongoDB connection error: ${err} ⁠);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed through app termination");
      process.exit(0);
    });
  } catch (error) {
    //console.error(⁠ Error connecting to MongoDB: ${error.message} ⁠);
    process.exit(1);
  }
};

export default connectDB;