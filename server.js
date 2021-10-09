const express = require('express')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')

const app = express()
const PORT = process.env.PORT || 5000;
connectDB()
app.use(express.json({extended: false}))
app.use(cookieParser())


app.get('/', (req, res) => {
    return res.send('Hello World')
})

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})