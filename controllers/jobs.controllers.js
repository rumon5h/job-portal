const { getJobsServices, getSpecificJobService } = require("../services/jobs.services");

exports.getAllJob = async (req, res) => {
    try {
        let filters = { ...req.query };
        const excludeFields = ['sort', 'page', 'limit'];

        excludeFields.forEach(field => delete filters[field]);

        let filterStrings = JSON.stringify(filters);

        filterStrings = filterStrings.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        filters = JSON.parse(filterStrings);

        const queries = {};

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join();
            queries.sortBy = sortBy;
        }
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            queries.fields = fields;
        }
        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * parseInt((limit));
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        const jobs = await getJobsServices(filters, queries)

        res.status(200).json({
            status: "Success",
            message: " Successfully got all the jobs",
            data: jobs
        })
    } catch (error) {
        res.status(200).json({
            status: "failed",
            message: "failed to get all jobs",
            error: error.message
        })
    }
}

exports.getSpecificJob = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await getSpecificJobService(id)

        if (!job) {
            res.status(400).json({
                status: "failed",
                message: "Couldn't get job with this id",
                error: "Job not found with this id"
            })
        }

        res.status(200).json({
            status: "Success",
            message: "Successfully got the job",
            data: job
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Failed to get job",
            error: error.message
        })
    }
}