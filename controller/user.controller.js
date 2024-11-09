const prisma = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { updatingRefreshToken } = require('./updateRefreshToken')
const { body, validationResult, check } = require('express-validator')


const saltRounds = 10

const getUsers = async (req, res) => {
    try {
        const user = await prisma.user.findMany({
            select: {
                username: true,
                email: true,
                createdAt: true,
                updatedAt: true
            }
        })

        res.json({ user })
    } catch(err) {
        console.log(err)
    }
}

const dashboardLoad = async (req, res) => {
    return res.render('dasboard', {
        title: 'KOKUKA SPACE',
        layout: 'layouts/main-layout'
    })
}

const Register = async (req, res) => {
    
}

const Login = async (req, res) => {
   
}

const loginPageLoad = async (req, res) => {
    return res.render('loginPage', {
        title: "KOKUKA SPACE | LOGIN",
        layout: 'layouts/login-register-layout'
    })
}

const registerPageLoaad = async (req, res) => {
    return res.render('registerPage', {
        title: "KOKUKA SPACE | REGISTER",
        layout: 'layouts/login-register-layout'
    })
}

const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return sendStatus(204)
        const users = await prisma.user.findMany({
            where: {
                refreshToken: refreshToken
            }
        })

    if (!users) return res.sendStatus(204)
        const idUser = users.id
    await prisma.user.update({
        where: {
            idUser: idUser
        },
        data: {
            refreshToken: refreshToken
        }
    })
    req.clearCookie()
    return res.redirect('/login')
}

module.exports = {
    getUsers,
    Register,
    Logout,
    Login,
    dashboardLoad,
    loginPageLoad,
    registerPageLoaad
}
