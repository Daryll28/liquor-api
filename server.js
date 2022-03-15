require('dotenv/config')

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database is connected'))

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.set('port', process.env.PORT || 3120)

app.listen(app.get('port'), () => console.log(`Backend server is running on port ${app.get('port')}`))