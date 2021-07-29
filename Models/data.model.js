const mongoose = require("mongoose");
let schema = mongoose.Schema;

const dataSchema = schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Data", dataSchema);