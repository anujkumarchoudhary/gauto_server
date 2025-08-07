const Services = require('../models/services.model')

exports.getAllService = async (req, res) => {

    try {
        const service = await Services.find()
        return res.status(200).json({ message: "All Services", data: service })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "internal server error" })
    }
}

exports.createService = async (req, res) => {

    const { name, description } = req.body;

    try {
        const service = await Services.findOne({ name })
        if (service) {
            return res.status(401).json({ message: "This service exit already!" })
        }
        const newService = new Services({ name, description })

        await newService.save()
        return res.status(201).json({ message: "This service created successfully!", data: newService })
            
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "internal server error" })
    }
}
