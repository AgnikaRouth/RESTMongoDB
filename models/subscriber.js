const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  /*subscribeDate: {
    type: Date,
    required: true,
    default: Date.now
  }*/
  age: {
      type: Number,
      required: true
  }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)