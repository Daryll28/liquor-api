require("dotenv").config();

const auth = require('../Middleware/auth')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const  User = require('../models/user')
const {getUser} = require ("../Middleware/getUser.js")





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

  const{ name, email, password, contact } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt)

     const user = new User({
         name,
         email,
         password: hashedPassword,
         contact 
     })
  try {
 const newUser = await user.save()
 res.status(201).json(newUser);

 try{
   const access_token = jwt.sign(
     JSON.stringify(newUser),
     process.env.JWT_SECRET_KEY
   );
 } catch (err){
   res.status(500).json({ message: error.message });
 }
     } catch (err) {
         res.status(400).json({ message:err.message})
     }
})


// LOGIN user with email + password
router.patch("/login", async (req, res, next) => {

  // try{
  //     const user = await User.findOne({ user: req.body.user});
  //     !user && res.status(401).json("Wrong Credentials")
      
  //     const hashedPassword = bcrypt.compare(
  //         user.password,
  //         process.env.SECRET_TOKEN
  //     );
  //     const password = hashedPassword.toString(bcrypt)

  //     password !==req.body.password && res.status(401).json("Wrong Credentials")

  //     res.status(200).json(user)
  // } catch (err) {
  //     res.status(500).json(err);
  // }
  
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) res.status(404).json({ message: "Could not find user" });
  if (await bcrypt.compare(password, user.password)) {
    try {
      console.log(process.env.JWT_SECRET_KEY)
      const access_token = jwt.sign(
     JSON.stringify(user),
    process.env.JWT_SECRET_KEY
 );
      res.status(201).json({ jwt: access_token });
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  } else {
    res
      .status(400)
      .json({ message: "Email and password combination do not match" });
  }
});

 
//updating one
router.put('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }    if (req.body.password != null) {
        res.user.password = req.body.password
    }
    if (req.body.contact != null) {
      res.user.contact = req.body.contact
  }
    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch(err) {
        res.status(400).json({ message: err.message})
    }
    
})




  // REGISTER a user
  router.post("/", async (req, res, next) => {
    const { name, email, password, contact} = req.body;
  
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const user = new User({
      name,
      email,
      contact,
      password: hashedPassword,
    });
  
    try {
      const newUser = await user.save();
  
      try {
        const access_token = jwt.sign(
          JSON.stringify(newUser),
          process.env.SECRET_TOKEN
        );
        res.status(201).json({ jwt: access_token});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


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