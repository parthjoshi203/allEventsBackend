const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
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
  userEmail:{
    type:String,
    required:true
  }

});

const eventModel = model('Events', eventSchema);

module.exports = eventModel;
