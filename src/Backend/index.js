const express = require("express");
const connectDB = require("./config/db");
const authRouter = require("../Backend/routes/authRouter");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
// Connect to MongoDB
connectDB()
  .then(() => {
    // Define routes after successful connection
    app.use("/", authRouter);

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
