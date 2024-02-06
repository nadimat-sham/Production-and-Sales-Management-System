require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const showRoomProductRoutes = require("./routes/showroom/productRoutes");
const sellRoutes = require("./routes/showroom/sellRoutes");
const customerRoutes = require("./routes/showroom/customerRoutes");


const employeeRoutes = require("./routes/employee/employeeRoutes")

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes

//Showroom routes
app.use("/showroom/products", showRoomProductRoutes);
app.use("/showroom/sells", sellRoutes);
app.use("/showroom/customers", customerRoutes);

//Employee routes
app.use("/employees", employeeRoutes)

// connect to db
console.log("Here")
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
