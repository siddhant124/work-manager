import mongoose from "mongoose";

const config = {
  isConnected: 0,
};

export const connectDb = async () => {
  if (config.isConnected == 1) {
    return;
  }

  try {
    // the will work asyncronously, so to make it syncronous we'll use await.
    const { connection } = await mongoose.connect(
      `${process.env.MONGO_DB_URL}`,
      {
        dbName: "work_manager",
      }
    );

    config.isConnected = connection.readyState; 

    console.log(`Connected to ${connection.db.databaseName} database.`);
    console.log(connection);
  } catch (error) {
    console.error("Error connecting to the database", error);
    throw error; // Optionally, you can rethrow the error if you want to handle it further up the call stack
  }
};
