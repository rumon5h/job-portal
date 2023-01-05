const mongoose = require('mongoose');
const validator = require('validator');
const {ObjectId} = mongoose.Schema.Types;

const jobSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name!'],
        trim: true,
        minLength: [3, 'Name must be at least 3 characters!'],
        maxLength: [255, 'Name cannot be more then 255 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide the description'],
        trim: true,
        minLength: [10, 'Description must be at least 10 characters'],
    },
    salary:{
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    job_type: {
        type: String,
        required: true
    },
    candidates_applied:[
        {
            id: {
                type: ObjectId
            },
            name: {
                type: String
            },
            email: {
                type: String,
                validate: [validator.isEmail, "Please enter a valid email address!"]
            }
        }
    ],
    deadline: {
        type: Date,
        required: true
    },
},
{
    timestamps: true
}
);

const Jobs = mongoose.model('Job', jobSchema);

module.exports = Jobs;