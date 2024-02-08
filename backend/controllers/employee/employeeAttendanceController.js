const Attendance = require('../../models/employee/employeeAttendanceModel')


//app.use(bodyParser.json());

// Add attendance record
const postAttendance = async (req, res) => {
  console.log("hi4")
  const { employeeUsername, date, status, checkIn, checkOut, reason, location } = req.body;
  
  try {
    const attendance = new Attendance({ employeeUsername, date, status, checkIn, checkOut, reason, location });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get attendance records
const getAttendance = async (req, res) => {
  console.log("hi3")
  try {
    console.log("hi1")
    const records = await Attendance.find();
    res.json(records);
  } catch (error) {
    console.log("hi2")
    res.status(500).json({ error: error.message });
  }
}


const getAttendanceBySearch = async (req, res) => {
  console.log("hi5")
  const { date, employeeUsername } = req.query;
  try {
    const query = {};
    if (date) query.date = new Date(date);
    if (employeeUsername) query.employeeUsername = employeeUsername;
    const records = await Attendance.find(query);
    console.log(records);
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecord = await Attendance.findByIdAndDelete(id);
    if (!deletedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json({ message: "Record deleted successfully", deletedRecord });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



module.exports = {
  getAttendance,
  postAttendance,
  getAttendanceBySearch,
  deleteAttendance,
}