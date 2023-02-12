const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB".cyan.underline.bold))
    .catch((err) => console.log(`Error Occured, ${err}`));

  mongoose.connection.on("Desconnected", (err) =>
    console.log("MongoDB is Disconnected", err.message)
  );

  mongoose.connection.on("Reconnected", () =>
    console.log("MongoDB is Resconnected")
  );
};

module.exports = connectDB;
