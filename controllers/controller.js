const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userModel = require("../models/User")
const signup = async (req, res) => {
    const { firstName, lastName, username, password, confirmPassword } = req.body
    if (password !== confirmPassword) {
        res.status(400).json({ message: "Passwords do not match" })
    }
    try {
        const bcryptPass = await bcrypt.hash(password, 10)
        const userCreated = await userModel.create({
            firstName,
            lastName,
            username,
            password: bcryptPass
        })

        const token = jwt.sign(
            { id: userCreated._id, username },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        )
        res.status(200).json({ message: "ok", data: userCreated, token })
    } catch (e) {
        res.status(400).json({ message: e })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(400).json({ message: "user credentials not provided" })
    } else {
        try {
            const user = await userModel.findOne({ username })
            const match = await bcrypt.compare(password, user.password)
            if (match) {
                res.status(200).json({ message: " user logged in" })
            }
        } catch (e) {

        }
    }
}


module.exports = {
    signup,
    login
}