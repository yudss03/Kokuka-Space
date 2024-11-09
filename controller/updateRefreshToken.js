const prisma = require('../config/db')

module.exports = {
    updatingRefreshToken: async (email, refreshToken) => {
        const updateUser = await prisma.user.update({
            where: {
                email: email
            }, data: {
                refreshToken: refreshToken
            }
        })

        return updateUser
    }
}