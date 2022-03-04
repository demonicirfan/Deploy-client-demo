const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')

const mongoose = require('mongoose')
const session = require('express-session')
const MongoDbStore = require('connect-mongo')

const flash = require('express-flash')
const passport = require('passport')
require('dotenv').config()

 //DB
mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database Connected...');
});

//Session config

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create({mongoUrl: process.env.URL}),
    cookie: { maxAge: 1000 * 60 * 60 * 24}// 24 ore
}))

app.use(flash())

const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

 app.use(express.static('public'))
 app.use('/img', express.static(__dirname + 'public/img'))
 app.use(express.static(path.join(__dirname, 'build')))
 app.use(express.urlencoded({ extended: false}))
 app.use(express.json())

 //global middleware
 app.use((req, res, next) => {
     res.locals.session = req.session
     res.locals.user = req.user
     res.locals.postdnd = req.postdnd
     res.locals.dataBase = req.mongoose
     next()
 })


 //imposto il template delle pagine
 app.use(expressLayout)
 app.set('views', path.join(__dirname, '/resources/views'))
 app.set('view engine', 'ejs')

 require('./routers/web')(app)
 app.use((req,res) => {
     res.status(404).render('error/404')
 })



 app.listen(process.env.PORT || 3000,'0.0.0.0', () => {
    console.log(`Listening on port ${process.env.PORT}, http://localhost:3000/`)
 })