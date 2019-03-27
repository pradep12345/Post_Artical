const express = require("express")
const app = express()
const router = express.Router()
const path = require('path')
const mongoose = require("mongoose")
const config = require('./config/database')
const bodyParser = require("body-parser")
const authentiation = require('./routes/authentication')(router)
const cors = require("cors")
const morgan = require("morgan")
const port = process.env.PORT || 8085
app.use(morgan("dev"))
//database connection string
mongoose.Promise = global.Promise
mongoose.connect(config.uri, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("connected: " + config.db)
    }
})
//database end
app.use(cors({
    origin: 'http://localhost:4200'
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public/'))
app.use('/authentication', authentiation)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})
app.listen(port, (err) => {
    console.log("runing")
})