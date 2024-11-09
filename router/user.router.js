const express = require('express')
const router= express.Router()
const { verifyTokenUser } = require('../middleware/verifyTokenUser')
const prisma = require('../config/db')
const { body, check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { updatingRefreshToken } = require('../controller/updateRefreshToken')
const { refreshTokenUser } = require('../controller/refreshTokenUser')
const midtransClient = require('midtrans-client')
const { generateOtp } = require('otpgeneratorpro')

const otp = generateOtp(8)


router.get('/', (req, res) => {
    const token = req.cookies.refreshToken

    if(token) {
        return res.redirect('/dashboard')
    }

    res.render('index', {
        title: 'KOKUKA SPACE',
        layout: 'layouts/index-layout'
    })
})

router.get('/dashboard', (req, res) => {
    const token = req.cookies.refreshToken

    if(!token) {
        return res.redirect('/')
    }

    res.render('dashboard', {
        title: 'KOKUKA SPACE',
        layout: 'layouts/main-layout'
    })
})

router.get('/login', (req, res) => {
    res.render('loginPage', {
        title: 'KOKUKA SPACE | LOGIN',
        layout: 'layouts/login-register-layout'
    })
})
// REGISTER ROUTES
router.post('/register', async (req, res) => {
    const saltRounds = 10
    // if(errors) {
    //     res.render('registerPage', {
    //         title: 'KOKUKA SPACE | REGISTER',
    //         layout: 'layouts/login-register-layout',
    //     })
    // }

    const hashingPass = await bcrypt.hash(req.body.password, saltRounds)

    const insertUser = await prisma.user.create({
        data: {
            username: req.body.username,
            email: req.body.email,
            password: hashingPass,
            refreshToken: ""
        }
    })

    if(!insertUser) {
        return res.redirect('/register')
    }

    req.flash('info', 'Berhasil melakukan register')
    res.redirect('/login')
})

router.get('/register', (req, res) => {
    res.render('registerPage', {
        title: 'KOKUKA SPACE | REGISTER',
        layout: 'layouts/login-register-layout'  
    })
})

// LOGIN ROUTES
router.post('/login', async (req, res) => {
    const users = await prisma.user.findFirst({ 
        where: {
            email: req.body.email,
        }
    })

    const comparePass = await bcrypt.compare(req.body.password, users.password)
    
    if(req.body.email != users.email && !comparePass) {
        return res.send('Password atau email salah!')
    }

    const userId = users.id
    const username = users.username
    const email = users.email

    const accessToken = jwt.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })

    const refreshToken = jwt.sign({ userId, username, email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
    
    await updatingRefreshToken(email, refreshToken)

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })


    if (email == "admin@gmail.com") {
        return res.redirect('/admin')
    }

    res.cookie('user', users.username, {
        maxAge: 24 * 60 * 60 * 1000
    })

    res.cookie('email', users.email, {
        maxAge: 24 * 60 * 60 * 1000
    })

    res.redirect('/dashboard')
})

// LOGOUT ROUTES
router.get('/logout', async (req, res) => {
    // const refreshToken = req.cookies.user

    // if (!refreshToken) return res.send('Gagal logout')

    // const users = await prisma.user.findFirst({
    //     where: {
    //         refreshToken: refreshToken
    //     }
    // })

    // if (!users) return res.sendStatus(204)

    // const email = users.email

    // const update = await prisma.user.update({
    //     where: {
    //         email: email,
    //     }, data: {
    //         refreshToken: refreshToken,
    //     }
    // })

    res.clearCookie('refreshToken')
    res.redirect('/')
})

router.get('/products', async (req, res) => {
    const products = await prisma.products.findMany()
    const token = await req.cookies.refreshToken

    if(!products) {
        return res.send('Tidak ada products!')
    }

    if(!token) {
        return res.redirect('/login')
    }

    res.render('productsPage', {
        title: 'KOKUKA SPACE | PRODUCTS',
        layout: 'layouts/products-layout',
        products
    })
})

const snap = new midtransClient.Midtrans.Snap({
    isProduction: false,
    serverKey: 'SB-Mid-server-xWDYWXQrJU0D-zxtft0XG0CY',
})

router.post('/transaction', async (req, res) => {
        const { gross_amount, username, email } = req.body

        let parameter = {
            transaction_details: {
                order_id: otp,
                gross_amount: gross_amount,
            }, 
            credit_card: {
                secure: true,
            },
            customer_details: {
                username: username,
                email: email,
            },
        }

        snap.createTransaction(parameter).then((transactions) => {
            let transactionToken = transactions.token

            return res.json({ transactionToken })
        })

})

module.exports = router

