import mongoose from "mongoose";
import config from "./../config";

const cache = () => {
  mongoose.connect(config.MongoDbName as string);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Mongo Connected successfully");
  });
};

export default cache;
