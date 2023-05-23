const express = require("express")
const router = require("./routes/router")
const morgan = require("morgan")
const bodyParser = require("body-parser")
require("dotenv").config()

const connect = require("./db/DBconnections")
const authMiddleware = require("./middleware/auth")


const app = express()
app.use(express.static("/public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan("dev"))

app.use("/chat", router)

app.get('/', authMiddleware, (req, res) => {
    res.send("message: hello")
})

const start = async () => {
    try {
        await connect(process.env.DATABASE_URI)
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => console.log(`serving at http://localhsot:${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()