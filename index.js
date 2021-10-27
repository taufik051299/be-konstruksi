const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.static('public'))

app.get('/', (req, res)=>{
  res.send("<center><img src='github.png'/><h1>This is a base for REST API using node js developed by ainurhmt</h1></center>")
})

const router = require('./router')
app.use('/api', router)

app.listen(process.env.PORT || 8000, ()=>{
  console.log(`Server is running`)
})