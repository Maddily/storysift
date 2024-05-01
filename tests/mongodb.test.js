const mongoose = require("mongoose");
require("dotenv").config();

describe("MongoDB Connection", () => {
  it("should connect to MongoDB", async () => {
    try {
      if (!process.env.DB_URI) {
        throw new Error("DB_URL environment variable is not defined");
      }

      await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log("Successfully connected to MongoDB!");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    } finally {
      await mongoose.disconnect();
    }
  });
});
