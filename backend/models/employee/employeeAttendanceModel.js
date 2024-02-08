const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  employeeUsername: {
        type: String,
        required: true
  },
  date: { 
    type: Date, 
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late', 'On Leave'],
    required: true
  },
  checkIn: {
    type: Date,
    required: function() { return this.status === 'Present' || this.status === 'Late'; }
  },
  checkOut: {
    type: Date,
    required: false
  },
  reason: {
    type: String,
    required: function() { return this.status === 'Absent' || this.status === 'On Leave'; }
  },
  location: {
    type: String,
    required: false
  }
}, { timestamps: true }); // Auto-generate createdAt and updatedAt fields

module.exports = mongoose.model('Attendance', AttendanceSchema);




