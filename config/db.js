const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_DB)
        console.log("db connected")
    }
    catch (err) {
        console.log("err", err)
        process.exit(1)
    }
}

module.exports = connectDB