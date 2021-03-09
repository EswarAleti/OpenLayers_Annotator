const mongoose = require("mongoose")

const AnnotationSchema = new mongoose.Schema({
    lat: Number,
    long: Number,
    annotation: String
  });

module.exports.AnnotationModel =  mongoose.model('Annotation', AnnotationSchema);