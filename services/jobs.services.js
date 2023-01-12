const Jobs = require('../models/Job');

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