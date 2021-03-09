const { response } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const {AnnotationModel} = require("./schema")
var cors = require('cors')

require("dotenv").config()

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.post('/geolocation', async(req, res) => {
    const data = req.body;
    const model = new AnnotationModel({
      lat: data.lat,
      long: data.long,
      annotation: data.annotation
    })
    const response = await model.save()
    res.json(response)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})