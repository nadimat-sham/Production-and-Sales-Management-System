const Performance = require('../../models/employee/employeePerformanceModel')


// Get attendance records
const getPerformance = async (req, res) => {
    //console.log("hi3")
    try {
      //console.log("hi1")
      const records = await Performance.find();
      res.json(records);
    } catch (error) {
      //console.log("hi2")
      res.status(500).json({ error: error.message });
    }
}

const deletePerformance = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRecord = await Performance.findByIdAndDelete(id);
      if (!deletedRecord) {
        return res.status(404).json({ message: "Record not found" });
      }
      res.json({ message: "Record deleted successfully", deletedRecord });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getPerformance,
    deletePerformance,
  }