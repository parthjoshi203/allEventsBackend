const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  city:{
    type:String,
    required:true
  },
  description: {
    type: String,
    required: true
  },
  userEmail:{
    type:String,
    required:true
  }

});

const eventModel = model('Events', eventSchema);

module.exports = eventModel;
