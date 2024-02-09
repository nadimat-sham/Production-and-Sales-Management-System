const Attendance = require('../../models/employee/employeeAttendanceModel')
const EmployeePerformance = require('../../models/employee/employeePerformanceModel')


//app.use(bodyParser.json());

// Add attendance record
const postAttendance = async (req, res) => {
  //console.log("hi4")
  const { employeeUsername, date, status, checkIn, checkOut, reason, location } = req.body;
  try {
    let employee = await EmployeePerformance.findOne({ username: employeeUsername });
    if (!employee) {
      employee = new EmployeePerformance({ username: employeeUsername });
    }
    employee.totalWorkingDays += 1;
    console.log(status);
    //employee[status] += 1; // increment the appropriate field based on attendance
    if(status === "Present"){
      employee.present += 1;
    } else if(status==="Absent"){
      //console.log("hi13");
      employee.absent += 1;
    } else if(status==="Late"){
      employee.late += 1;
    } else {
      employee.onLeave += 1;
    }
    const absentLatePercentage = ((employee.absent + employee.late) / employee.totalWorkingDays) * 100;
    if (absentLatePercentage < 5) {
      employee.performance = 'Very good';
    } else if (absentLatePercentage < 10) {
      employee.performance = 'Good';
    } else {
      employee.performance = 'Bad';
    }
    await employee.save();
    //res.status(200).json(employee);
    const attendance = new Attendance({ employeeUsername, date, status, checkIn, checkOut, reason, location });
    await attendance.save();
    res.status(201).json(attendance);


  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get attendance records
const getAttendance = async (req, res) => {
  //console.log("hi3")
  try {
    //console.log("hi1")
    const records = await Attendance.find();
    res.json(records);
  } catch (error) {
    //console.log("hi2")
    res.status(500).json({ error: error.message });
  }
}


const getAttendanceBySearch = async (req, res) => {
  //console.log("hi5")
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