require('dotenv').config()
const {User} = require('./models/index')
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const passport = require("./lib/passport")
const restrict = require("./middlewares/restrict")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize())

app.get('/', (req, res) => {
   res.send('OK')
})

app.post('/user/create', (req, res) => {
   const {name, email, password} = req.body
   if (!name || !email || !password) {
      res.send('Data tidak lengkap')
   } else {
      User.create({name, email, password})
      .then((data) => {
         res.send("CREATED! " + data)
      })
      .catch((err) => {
         res.send("error: " + err)
      })
   }
})

app.post('/login', (req, res) => {
   // fungsi format response
   const format = (user) => {
      const { id, email } = user;
      return {
         id,
         email,
         token: user.generateToken()
      }
   }

   // lakukan autentikasi
   User.authenticate(req.body)
      .then(user => {
         res.json(format(user))
      })
      .catch(err => {
         res.json({
            message: err
         })
      })
})

app.get('/whoami', restrict, (req, res) => {
   const currentUser = req.user
   res.json(currentUser)
})

app.listen(port, () => {
   console.log("App running on port ", port)
})