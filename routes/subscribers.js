const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

// Getting all
router.get('/', async (req,res) =>{
    try {
        const subscribers = await Subscriber.find() //search Subscriber schema with find function
        res.json(subscribers)
      } catch (err) {
        res.status(500).json({ message: err.message }) //500 server down
      }

})

//Getting One
router.get('/:id', getSubscriber, (req,res) => {
    res.json(res.subscriber)

})

//Creating One
router.post('/', async (req,res) =>{

    const subscriber = new Subscriber({
        name: req.body.name,
        location: req.body.location,
        age : req.body.age
      })
      try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber) //request was successful and as a result, a resource has been created
      } catch (err) {
        res.status(400).json({ message: err.message }) //error with user input. Here, message is an object
      }

})

//Updating One
router.patch('/:id',getSubscriber, async(req,res) =>{
    //update only the elements sent to in by request
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
      }
      if (req.body.location != null) {
        res.subscriber.location = req.body.location
      }
      try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }

})

//Deleting One
router.delete('/:id',getSubscriber, async(req,res) =>{
    try {
        await res.subscriber.remove()
        res.json({ message: 'Deleted Subscriber' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }

})

//middleware setup
async function getSubscriber(req, res, next) {
    let subscriber
    try {
      subscriber = await Subscriber.findById(req.params.id) //same id as passed to the url
      if (subscriber == null) {
        return res.status(404).json({ message: 'Cannot find subscriber' }) //"not found" error
      }
    } catch (err) {
      return res.status(500).json({ message: err.message }) //return cause abort the function
    }
  
    res.subscriber = subscriber //to pass the subscriber value to other router functions
    next() //move to the next piece of middleware
  }

module.exports = router