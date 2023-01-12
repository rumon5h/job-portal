const Jobs = require('../models/Job');
const User = require('../models/User');

exports.getJobsServices = async (filter, queries) => {
    const result = await Jobs.find(filter)
        .skip(queries.skip)
        .limit(queries.limit)
        .sort(queries.sortBy)
        .select(queries.fields)
    return result;
};

exports.getSpecificJobService = async (id) => {
    const result = await Jobs.findOne({ _id: id });
    return result;
}

exports.saveAJobService = async (data) => {
    const result = await Jobs.create(data);
    return result;
}

exports.updateJobService = async (id, data) => {
    const result = await Jobs.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return result;
}

exports.getAppliedJob = async (data) => {
    const user = await User.findOne({ email: data.user.email });
    const { jobId } = data;

    const result = await Jobs.updateOne(
        { _id: jobId },
        { $push: { candidates_applied: { id: user._id, name: user.name, email: user.email } } }
    )

    return result;
}