import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectTodatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    return console.log("MONGODB_URI is not defined");
  }

  if (isConnected) {
    return console.log("=> using existing database connection");
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "onlineExamPlatform",
    });
    isConnected = true;
    return console.log("=> using new database connection");
  } catch (error) {
    throw error;
  }
};
