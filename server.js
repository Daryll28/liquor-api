require('dotenv/config')
const express = require('express')
const app = express()
const cors = require("cors")
const mongoose = require('mongoose')
const usersRouter = require('./routes/users')
const authRouter = require('./Middleware/auth')
const productRouter = require('./routes/productRouter')
const contactRoute = require('./routes/contactRoute')



mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database is connected'))

app.use(express.json())
app.use(cors());




app.use('/users', usersRouter)
app.use('/users/auth', authRouter)
app.use('/products', productRouter)
app.use('/contact', contactRoute)
app.get('/', (req, res) =>{
    res.send("Welcome to my Liquor Store api")
})




app.set('port', process.env.PORT || 3130)

app.listen(app.get('port'), () => console.log(`Backend server is running on port ${app.get('port')}`))