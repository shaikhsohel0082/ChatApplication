// config.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  useNewUrlParser: true;
  useUnifiedTopology: true;
  console.log("Db is connected");
};
export default connectToDatabase;
