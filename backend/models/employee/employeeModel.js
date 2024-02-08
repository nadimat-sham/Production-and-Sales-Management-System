
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: true },
  address: { type: String, required: false },
  salary: { type: Number, required: true },
  hireDate: { type: Date, required: false },
});

const employee = mongoose.model('Employee', employeeSchema);

module.exports = employee;