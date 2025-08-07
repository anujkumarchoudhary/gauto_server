const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const cors = require("cors")
dotenv.config()

//db connect
connectDB();

const app = express()
app.use(cors())

app.use(express.json())

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/employee", require("./routes/employee.routes"));
app.use("/api/car", require("./routes/car.routes"));
app.use("/api/service", require("./routes/service.routes"));

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
})