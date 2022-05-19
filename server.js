const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect Database
connectDB();

// Import Routes API
const usersRoute = require("./routes/api/users");
const productCardsRoute = require("./routes/api/productCards");

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

// Dedine Routes
app.use("/api/users", usersRoute);
app.use("/api/product-cards", productCardsRoute);

// Serve Static Assets In Production 1
if (process.env.NODE_ENV === "production") {
  // Set Static Folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started On PORT: ${PORT}`));
