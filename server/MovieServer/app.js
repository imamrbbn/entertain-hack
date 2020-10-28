const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORTMOVIE || 3001
const router = require('./routes')

app.use( express.json())
app.use(express.urlencoded({extended:true}))
app.use(router)


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })

// app.get('/', async (req,res) => {
//     const Hacktiv8 = db.collection('hacktiv8')
//     console.log(Hacktiv8, 'ini satu');
//     const users = await Hacktiv8.find({}).toArray()
//     console.log(users, 'ini dua');
//     res.send(users)
// })

// app.post('/', async (req,res) => {
//     const {name, age} = req.body
//     const newUserParam = {name,age}
//     const newUser = await db.collection('instructure'). insertOne(newUserParam) 
//     res.send(newUser.ops[0])
// })