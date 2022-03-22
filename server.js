require('dotenv/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const usersRouter = require('./routes/users')
const authRouter = require('./Middleware/auth')




mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database is connected'))

app.use(express.json())
app.use('/users', usersRouter)
app.use('/users/auth', authRouter)

app.get('/', (req, res) =>{
    res.send("Yooo")
})




app.set('port', process.env.PORT || 3110)

app.listen(app.get('port'), () => console.log(`Backend server is running on port ${app.get('port')}`))