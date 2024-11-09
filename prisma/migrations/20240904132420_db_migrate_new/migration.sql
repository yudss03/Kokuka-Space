-- CreateTable
CREATE TABLE `products` (
    `idProduct` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(100) NOT NULL,
    `productPrice` MEDIUMINT NOT NULL,
    `productImg` VARCHAR(191) NOT NULL,
    `productDesc` VARCHAR(191) NOT NULL,
    `productCategory` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Products_idProduct_key`(`idProduct`),
    PRIMARY KEY (`idProduct`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `idUser` VARCHAR(191) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `refreshToken` VARCHAR(191) NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `idTransaction` VARCHAR(191) NOT NULL,
    `idUser` VARCHAR(191) NOT NULL,
    `idProduct` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `jumlah` INTEGER NOT NULL,
    `subtotal` INTEGER NOT NULL,

    INDEX `Transactions_idUser_fkey`(`idUser`),
    INDEX `Transactions_idProduct_fkey`(`idProduct`),
    PRIMARY KEY (`idTransaction`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `Transactions_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `user`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `Transactions_idProduct_fkey` FOREIGN KEY (`idProduct`) REFERENCES `products`(`idProduct`) ON DELETE RESTRICT ON UPDATE CASCADE;
