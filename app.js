const express = require('express')
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const userControllers = require('./controller/user.controller')
require('dotenv').config()
const flash = require('connect-flash')
const prisma = require('./config/db')
const router = require('./router/user.router')
const admin = require('./router/admin.router')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(session({
    secret: 'key',
    saveUninitialized: true
}));
app.use(cookieParser())
app.use(expressLayouts)
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(flash())

app.use(router)
app.use(admin)

app.listen(port, () => {
    console.log(`Listening on port ${ port }`)
})