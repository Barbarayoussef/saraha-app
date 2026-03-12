import mongoose from "mongoose";

export const databaseConnection = () => {
  mongoose
    .connect("mongodb://localhost:27017/sara7a")
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(err);
    });
};
