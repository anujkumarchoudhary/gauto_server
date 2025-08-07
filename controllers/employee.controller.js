const Employee = require('../models/employee.model')

exports.getAll = async (req, res) => {

    try {
        const employee = await Employee.find({ salary: { $gt: 19000 } });
        return res.status(200).json({ message: "Employee", data: employee })
    }
    catch (err) {
        console.log("error", err)
    }
}
exports.getAllBetween = async (req, res) => {
    const { lt, gt } = req.query;

    console.log(lt, gt,"lt, gt>>>>")

    try {
        const filter = {};

        if (lt) {
            filter.salary = { ...filter.salary, $lt: Number(lt) }
        }

        if (gt) {
            filter.salary = { ...filter.salary, $gt: Number(gt) }
        }

        const employee = await Employee.find(filter)
        return res.status(200).json({ message: `data between ${lt} and ${gt}`, employee })

    }
    catch (err) {
        console.log("error", err)
        res.status(500).json({ message: "Internal server error" })
    }

}

exports.createEmployee = async (req, res) => {

    const { name, email, phone, gender, qualification, salary } = req.body;

    try {

        const employee = await Employee.findOne({ email })

        if (employee) {
            return res.status(401).json({ message: "Already exit" })
        }

        const newEmployee = new Employee({ name, email, phone, gender, qualification, salary })

        await newEmployee.save()

        return res.status(200).json({ message: "Employee created successfully", data: newEmployee })

    }
    catch (err) {
        res.status(500).json({ message: "internal server error" })
    }

}

exports.updateEmployee = async (req, res) => {
    const { id } = req.params
    const { name, email, phone, qualification, salary, gender } = req.body

    try {
        const isExitEmployee = await Employee.findById(id)
        if (!isExitEmployee) {
            return res.status(404).json({ message: "Employee not found" })
        }

        const updatedEmp = await Employee.findByIdAndUpdate(id, { name, email, phone, qualification, salary, gender }, { new: true })

        return res.status(201).json({ message: "Updated", data: updatedEmp })

    }
    catch (err) {
        res.status(500).json({ message: "internal server error" })
    }
}

exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const isExit = await Employee.findById(id)

        if (!isExit) {
            return res.status(400).json({ message: "Employee not found" })

        }
        const deletedEmp = await Employee.findByIdAndDelete(id)

        return res.status(200).json({ message: "Deleted Employee successfully", data: deletedEmp })

    }
    catch (err) {
        console.log("error", err)
        res.status(500).json({ message: "internal server error" })
    }
}

exports.deleteAllEmployee = async (req, res) => {
    try {
        const deleteAll = await Employee.deleteMany()
        return res.status(200).json({ message: "Deleted all employee", data: deleteAll })

    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.getSingleEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const isExit = await Employee.findById(id)
        if (!isExit) {
            return res.status(404).json({ message: "Employee not found" })
        }
        return res.status(200).json({ message: "get single employee", data: isExit })

    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}