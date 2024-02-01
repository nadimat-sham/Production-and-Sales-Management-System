require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const showRoomProductRoutes = require("./routes/showroom/productRoutes");
const sellRoutes = require("./routes/showroom/sellRoutes");
const customerRoutes = require("./routes/showroom/customerRoutes");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/showroom/products", showRoomProductRoutes);
app.use("/showroom/sells", sellRoutes);
app.use("/showroom/customers", customerRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
