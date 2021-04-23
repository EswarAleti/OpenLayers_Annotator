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
    res.json(annotations)
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
    res.send(annotations[min_index]);
})

app.put('/geolocation',async(req,res) => {
  const response = await AnnotationModel.updateOne({"lat":req.body.lat, "long":req.body.long},{$set:{"annotation":req.body.annotation}});
  res.json(response);
})

app.delete('/geolocation',async(req,res) => {
  var annotation = await AnnotationModel.remove(req.body).exec();
  res.send('Deleted successfully')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})