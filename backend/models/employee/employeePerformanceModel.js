const mongoose = require('mongoose');

const EmployeePerformanceSchema = new mongoose.Schema({
  username: { type: String, required: true },
  totalWorkingDays: { type: Number, default: 0 },
  present: { type: Number, default: 0 },
  absent: { type: Number, default: 0 },
  late: { type: Number, default: 0 },
  onLeave: { type: Number, default: 0 },
  performance: { type: String, default: 'Very good' } // default could be calculated based on logic
});

module.exports = mongoose.model('EmployeePerformance', EmployeePerformanceSchema);

