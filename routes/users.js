const express = require('express')
const router = express.Router()
const  User = require('../models/user')
const {getUser} = require ("../Middleware/getUser.js")


// American gangsta


//getting all
router.get('/', async (req, res) => {
try{
const users = await User.find()
res.json(users)
} catch (err) {
res.status(500).json({ message: err.message })
}

})
//getting one
router.get('/:id', getUser, (req, res, next) => {
    res.send(res.user)

})
//creating one
router.post('/', async (req, res) => {
     const user = new User({
         name: req.body.name,
         contact: req.body.contact,
         email: req.body.email,
         password: req.body.password   
     })
  try {
 const newUser = await user.save()
 res.status(201).json(newUser)
     } catch (err) {
         res.status(400).json({ message:err.message})
     }
})

 
//updating one
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.contact != null) {
        res.user.contact = req.body.contact
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }    if (req.body.password != null) {
        res.user.password = req.body.password
    }
    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch(err) {
        res.status(400).json({ message: err.message})
    }
    
})
//deleting one
router.delete('/:id', getUser, async (req, res) => {
    try{
        await res.user.remove()
        res.json({ message: 'Deleted user Successfully...'})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})



  module.exports = router