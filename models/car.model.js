const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    mileage: { type: Number, required: true },
    fuelType: { type: String, required: true },
    city: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model("Cars", carSchema);