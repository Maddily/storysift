// src/models/employees.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    }
});

module.exports = mongoose.models('Employee', employeeSchema);