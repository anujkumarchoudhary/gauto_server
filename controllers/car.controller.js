const Cars = require('../models/car.model')

exports.getAll = async (req, res) => {
    try {
        const carsData = await Cars.find();
        res.status(200).json({ message: "Car list", data: carsData })
    }
    catch (err) {
        console.log("error", err)
        res.status(500).json({ message: "Interval server error" })
    }
}

exports.getAllMakeWise = async (req, res) => {
    const { make } = req.params;
    const { minPrice, maxPrice, minYear, maxYear } = req.query;
    try {

        const matchStage = { make }

        if (minPrice || maxPrice) {
            matchStage.price = {}
            if (minPrice) matchStage.price.$gte = Number(minPrice);
            if (maxPrice) matchStage.price.$lte = Number(maxPrice);
        }

        if (minYear || maxYear) {
            matchStage.model = {}
            if (minYear) matchStage.model.$gte = new Date(minYear);
            if (maxYear) matchStage.model.$lte = new Date(maxYear);
        }

        const findMakeWise = await Cars.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: "$brand", // 👈 Grouping by brand
                    averagePrice: { $avg: "$price" },
                    totalCars: { $sum: 1 },
                    cars: { $push: "$$ROOT" } // Include all matching car documents
                }
            },
            // { $sort: { averagePrice: -1 } },
            // { $skip: 1 },
            // { $limit: 1 }
        ])
        return res.status(200).json({ message: "Make wise car report", data: findMakeWise })
    }
    catch (err) {
        console.log("error", err)
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.getAllModelWise = async (req, res) => {
    const { brand } = req.params;

    try {
        const findBrandWise = await Cars.aggregate([
            { $match: { brand } },
            { $sort: { price: 1 } }
        ])
        return res.status(200).json({ message: "Brand wise car report", data: findBrandWise })
    }
    catch (err) {
        console.log("error", err)
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.getAllBrandWise = async (req, res) => {
    const { brand } = req.params;
    const { minPrice, maxPrice, minYear, maxYear } = req.query;

    try {
        const matchStage = { brand }
        if (minPrice || maxPrice) {
            matchStage.price = {};
            if (minPrice) matchStage.price.$gte = Number(minPrice);
            if (maxPrice) matchStage.price.$lte = Number(maxPrice)
        }
        if (minYear || maxYear) {
            matchStage.model = {}
            if (minYear) matchStage.model.$gte = new Date(minYear);
            if (maxYear) matchStage.model.$lte = new Date(maxYear)
        }

        const findModelWise = await Cars.aggregate([
            { $match: matchStage },
            { $sort: { price: 1 } }
        ])
        return res.status(200).json({ message: "brand wise car report", data: findModelWise })
    }
    catch (err) {
        console.log("error", err)
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.createCar = async (req, res) => {
    const { name, brand, modal, make, price, userId } = req.body
    try {
        const car = await Cars.findOne({ name })
        if (car) {
            return res.status(401).json({ message: "This car already exit!" })
        }
        const createNew = new Cars({ name, brand, modal, make, price, userId })
        await createNew.save()
        return res.status(201).json({ message: `${name} created successfully!` })
    }
    catch (err) {
        console.log("error", err)
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.createInBulk = async (req, res) => {
    const carData = req.body;
    try {
        const createManyCars = await Cars.insertMany(carData)
        return res.status(201).json({ message: "Created", data: createManyCars })

    }
    catch (err) {
        console.log("error", err)
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.updateCar = async (req, res) => {
    const { id } = req.params
    const { name, brand, make, modal, price } = req.body;

    try {
        const car = await Cars.findById(id)
        if (!car) {
            return res.status(400).json({ message: "This car not found" })
        }
        const updatedCar = await Cars.findByIdAndUpdate(id, { name, brand, make, modal, price }, { new: true })

        return res.status(201).json({ message: "This card details updated", data: updatedCar })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.deleteCar = async (req, res) => {
    const { id } = req.params;
    try {

        const car = await Cars.findById(id)
        if (!car) {
            return req.status(404).json({ message: "Car not found" })
        }

        const deletedCar = await Cars.findByIdAndDelete(id)
        return res.status(200).json({ message: "Deleted car successfully!", data: deletedCar })

    }
    catch (err) {
        console.log("error", err)
        res.status(500).json({ message: "Internal server error" })
    }
}
exports.deleteAllCar = async (req, res) => {

    try {
        const deletedAll = await Cars.deleteMany()
        return res.status(200).json({ message: "Deleted car successfully!", data: deletedAll })
    }
    catch (err) {
        console.log("error", err)
        res.status(500).json({ message: "Internal server error" })
    }
}