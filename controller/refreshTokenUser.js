const jwt = require('jsonwebtoken')
const prisma = require('../config/db')

module.exports = {
    refreshTokenUser: async (req, res) => {
        const refreshToken = req.cookies

        if(!refreshToken) return res.sendStatus(401) 
        const user = await prisma.user.findMany({
            where: {
                refreshToken: refreshToken
            }
        })

        if(!user) return res.send('Jir')
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if(err) return res.send(err)
                    const userId = user.id
                    const username = user.username
                    const email = user.email

                    const accessToken = jwt.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'})
                    res.json({ accessToken })
            })

    }
}