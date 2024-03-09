// config.js
import mongoose from "mongoose";

const connectToDatabase = async () => {
  await mongoose.connect("mongodb://localhost:27017/chatApplication");
  useNewUrlParser: true;
  useUnifiedTopology: true;
  console.log("Db is connected");
};
export default connectToDatabase;
