
const mongoose = require('mongoose');

const Account = require('./employeeAccount')

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


employeeSchema.post('save', async function (doc) {
  try {
    const account = new Account({
      employee: doc._id,
      totalMoney: 0, 
      history: []
    });
    console.log(doc._id, "finally Saved")
    await account.save();
  } catch (error) {
    console.error('Error creating account:', error);
  }
});


const employee = mongoose.model('Employee', employeeSchema);

module.exports = employee;