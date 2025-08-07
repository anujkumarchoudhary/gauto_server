const User = require("../models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")

exports.getAll = async (req, res) => {

  try {
    const users = await User.find()
    return res.status(200).json({ message: "all users", data: users })

  }
  catch (err) {
    console.log("error", err)
    res.status(500).json({ message: "Internal server error" })
  }

}

exports.registerUser = async (req, res) => {
  const { name, email, phone, role, password } = req.body;

  try {

    const user = await User.findOne({ email })
    if (user) {
      return res.status(409).json({ message: "Already exit" })
    }

    const hatchedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name, email, phone, role, password: hatchedPassword
    })

    await newUser.save()

    return res.status(201).json({ status: true, message: "Register successfully!", data: newUser })

  }
  catch (err) {
    console.log("error", err)
    res.status(500).json({ message: "internal server error" })
  }

}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if (!matchPassword) {

      return res.status(404).json({ message: "Credential not valid" })
    }

    const token = await jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_CODE, { expiresIn: "7d" })

    return res.status(200).json({ message: "Login successfully!", token })

  }
  catch (err) {
    console.log("error", err)
    res.status(500).json({ message: "internal server error" })
  }

}

exports.deleteAllUser = async (req, res) => {
  const { id } = req.params;

  try {

    const deleteAll = await User.deleteMany()

    res.status(200).json({ message: "Deleted All Users", data: deleteAll })

  }
  catch (err) {
    console.log("error", err)
    res.status(500).json({ message: "Internal server error" })
  }

}