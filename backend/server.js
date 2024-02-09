require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const showRoomProductRoutes = require("./routes/showroom/productRoutes");
const sellRoutes = require("./routes/showroom/sellRoutes");
const customerRoutes = require("./routes/showroom/customerRoutes");
const orderRoutes = require("./routes/showroom/orderRoutes");
const receiveRoutes = require("./routes/showroom/receiveRoutes");

const employeeRoutes = require("./routes/employee/employeeRoutes");
const employeeAccountRoutes = require("./routes/employee/employeeAccountRoutes");
const employeeAttendanceRoutes = require("./routes/employee/employeeAttendanceRoutes");
const employeePerformanceRoutes = require("./routes/employee/employeePerformanceRoutes");

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
app.use("/showroom/orders", orderRoutes);
app.use("/showroom/receives", receiveRoutes);

//Employee routes
app.use("/employees", employeeRoutes);
app.use("/accounts", employeeAccountRoutes);

//attendance routes
app.use("/employeesAttendance", employeeAttendanceRoutes);
app.use("/employeesPerformance", employeePerformanceRoutes);

// connect to db
console.log("Here");
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
