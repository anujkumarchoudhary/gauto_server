const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({

    icon: { type: String },
    label: { type: String },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true,},

})

module.exports = mongoose.model("Services", serviceSchema)