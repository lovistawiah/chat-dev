const express = require("express")
const router = express.Router()
const { signup, login } = require("../controllers/controller")

router.route("/signup").post(signup)
router.route("/login").get(login)




module.exports = router