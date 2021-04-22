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
// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('connected to database'))

app.post('/geolocation', async(req, res) => {
    const data = req.body;
    const model = new AnnotationModel({
      lat: data.lat,
      long: data.long,
      annotation: data.annotation
    })
    const response = await model.save();
    res.json(response);
})

app.get('/geolocation', async(req, res) => {
    const annotations = await AnnotationModel.find(({ annotation: new RegExp(req.query.annotation, 'i')})).exec();
    res.send(annotations)
})

app.get('/nearest',async(req, res) => {  
    const annotations = await AnnotationModel.find().exec()
    const lat = req.query.lat;
    const long = req.query.long;
    var min_index = -1;
    var min_distance = 1;
    for(var i=0; i<annotations.length; i++)
    {
      var dist = Math.abs(lat-annotations[i].lat) + Math.abs(long-annotations[i].long);
      if(dist<min_distance)
      {
        min_distance = dist;
        min_index = i;
      }
    }
    console.log(annotations[min_index])
    res.send(annotations[min_index]);
})

app.delete('/geolocation',async(req,res) => {
  // console.log(req.body.lat,' ',req.body.long)
  // res.send('Deleted Successfully');
  // const data = req.body;
  await AnnotationModel.remove(req.body).exec();
  // const annotations = await AnnotationModel.find().exec()
  // console.log(annotations[0])
  res.send('Deleted successfully')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})