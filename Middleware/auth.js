require("dotenv").config();
const jwt = require("jsonwebtoken");
 


//REGISTER
// router.post('/register', async (req, res) => {
//     const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password   
//     })
//  try {
// const newUser = await user.save()
// res.status(201).json(newUser)
//     } catch (err) {
//         res.status(400).json({ message:err.message})
//     }
// })

//LOGIN

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token || token == null)
    return res.status(401).send({ message: "User not logged in" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) res.status(403).send({ message: err.message });
    // console.log("from auth: ", user)
    req.user = user;
    return next();
  });
}


module.exports = authenticateToken;


    //         id: user._id,
    //         isAdmin: user.isAdmin,
    //     },
        
    //         process.env.SECRET_TOKEN,
    //         {expiresIn:"3d"}

    //     //   JSON.stringify(user),
    //     //   process.env.SECRET_TOKEN
    