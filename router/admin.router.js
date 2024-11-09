const express = require('express')
const admin = express.Router()
const prisma = require('../config/db')

admin.get('/admin', async (req, res) => {
    const products = await prisma.products.findMany()
    const users = await prisma.user.findMany()

    // const token = req.cookies.refreshToken

    // if(!token) {
    //     return res.redirect('/login')
    // }

    if(!products) {
        return res.render('dashboardAdmin', {
            layout: 'layouts/admin-layout',
            error: "Products empty"
        })
    }

    // let no = 1

    // for(let i = 0; products.length; i++) {
    //     no++
    // }

    res.render('dashboardAdmin', {
        title: 'KOKUKA SPACE | ADMIN',
        layout: 'layouts/admin-layout',
        products,
        users
    })
})

admin.get('/admin/product/delete/:id', async (req, res) => {
    const deleteProduct = await prisma.products.delete({
        where: {
            idProduct: req.params.id
        }
    })

    if (!deleteProduct) {
        return res.redirect('/admin')
    }

    return res.redirect('/admin')
})

admin.post('/admin/product', async (req, res) => {
    const productName = req.body.productName
    const productPrice = req.body.productPrice
    const productImg = req.body.productImg
    const productDesc = req.body.productDesc
    const productCategory = req.body.productCategory

    const insertDataProduct = await prisma.products.create({
        data: {
            productName: productName,
            productPrice: parseInt(productPrice),
            productImg: productImg,
            productDesc: productDesc,
            productCategory: productCategory
        }
    })

    if (!insertDataProduct) {
        res.redirect('/admin')
    }

    return res.redirect('/admin')
})

admin.get('/admin/product/:id', async (req, res) => {
    const productName = req.body.productName
    const productPrice = req.body.productPrice
    const productImg = req.body.productImg
    const productDesc = req.body.productDesc
    const productCategory = req.body.productCategory

    const editDataProduct = await prisma.products.update({
        where: {
            idProduct: req.params.id
        }, data: {
            productName: productName,
            productPrice: parseInt(productPrice),
            productImg: productImg,
            productDesc: productDesc,
            productCategory: productCategory
        }
    })

    if (!editDataProduct) {
        res.redirect('/admin')
    }

    res.redirect('/admin')
})

module.exports = admin