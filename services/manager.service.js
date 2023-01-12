const Job = require("../models/Job")

exports.findSpecificJobs = async (data) => {
    const result = await Job.find({ id: data.id })
    
    return result;
}