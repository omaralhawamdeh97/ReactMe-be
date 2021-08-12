// Packages
const express = require("express");
const cors = require("cors");
const passport = require("passport");

// Middlewares
const { localStrategy } = require("./Middlewares/passport");
const { jwtStrategy } = require("./Middlewares/passport");

// Routes
const userRoutes = require("./Routes/userRoutes");
const postRoutes = require("./Routes/postRoutes");

// App uses
const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use("/media", express.static("media"));

// Routes uses
app.use(userRoutes);
app.use(postRoutes);

// Error handling middleware
app.use((req, res, next) => {
  const err = new Error("Path Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

// App run
const PORT = 8000;
app.listen(PORT, () => {
  console.log("The application is running on localhost:8000");
});
