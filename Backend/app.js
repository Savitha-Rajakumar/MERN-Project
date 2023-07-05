const express = require("express");
const parser = require("body-parser");
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/user-routes");
const app = express();
app.use(parser.json());
app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);
app.use((error, req, res, next) => {
  if (res.headerSent) {
    next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unexpected error" });
});
app.listen(5000);
