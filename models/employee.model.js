const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"] // ✅ enum added
    },
    qualification: {
        type: String,
        required: true,
        enum: ["10th", "12th", "Graduate", "Post-Graduate", "Diploma"] // ✅ enum added
    },
    salary: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Employee", EmployeeSchema);
