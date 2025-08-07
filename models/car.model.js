const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({
    name: String,
    brand: String,
    model: Date,
    make: String,
    price: Number,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Cars", carSchema);