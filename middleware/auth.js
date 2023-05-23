const jwt = require("jsonwebtoken")

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader.startsWith("Bearer")) {
            res.status(400).json({ message: "Invalid authorization" })
        } else {
            const token = authHeader.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const { id, username } = decoded
            req.user = { id, username }
        }
        next()
    } catch (e) {
        res.status(400).json({ message: "Not authorized" })
    }
}
module.exports = authMiddleware