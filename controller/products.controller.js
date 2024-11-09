const prisma = require('../config/db')
const jwt = require('jsonwebtoken')

const getAllProducts = async (req, res) => {
    const products = await prisma.products.findMany()

    if(!products) {
        return res.send('Tidak ada products')
    }

    return products
}

module.exports = {
    getAllProducts
}