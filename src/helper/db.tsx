import { User } from "@/modles/user";
import mongoose from "mongoose";

export const connectDb = async () => {
  try {

    const mongoDbUrl = process.env.MONGO_DB_URL;

    if (!mongoDbUrl) {
      throw new Error("MONGO_DB_URL environment variable is not defined");
    }

    // the will work asyncronously, so to make it syncronous we'll use await.
    const { connection } = await mongoose.connect(mongoDbUrl, {
      dbName: "work_manager",
    });

    console.log(`Connected to ${connection.db.databaseName} database.`);
    console.log(connection)

    const user = new User({
      name: "test",
      email: "test@gmail.com",
      password: "test@123",
      about: "This is a test user"
    })

    await user.save()
    console.log("user is created")

  
  } catch (error) {

    console.error("Error connecting to the database", error);
    throw error; // Optionally, you can rethrow the error if you want to handle it further up the call stack
  
  }
};
