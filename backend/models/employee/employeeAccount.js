// EmployeeAccount.js

const mongoose = require('mongoose');

const employeeAccountSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  totalMoney: {
    type: Number,
    default: 0,
  },
  history: [
    {
      type: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const EmployeeAccount = mongoose.model('EmployeeAccount', employeeAccountSchema);

module.exports = EmployeeAccount;