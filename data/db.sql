CREATE TABLE `category` (
    `category_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `fundraiser` (
    `fundraiser_id` INT AUTO_INCREMENT PRIMARY KEY,
    `organizer` VARCHAR(191) NOT NULL,
    `caption` VARCHAR(191) NOT NULL,
    `target_funding` FLOAT NOT NULL,
    `current_funding` FLOAT NOT NULL DEFAULT 0,
    `city` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL,
    `category_id` INT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    CONSTRAINT `fundraiser_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `category` (`category_id`, `name`) VALUES
(1, 'Health'),
(2, 'Charity'),
(3, 'Relief');

INSERT INTO `fundraiser` (organizer, caption, target_funding, current_funding, city, active, category_id) VALUES
('Harry Smith Foundation', 'Helping the less priviledged', 230000, 120000, 'Melbourne', true, 2),
('Cincy Organisation', 'Feeding the hungry', 350000, 153021, 'Victoria', true, 2),
('George W. Foundation', 'Conducting free eye test', 40000, 350, 'Ottawa', true, 1),
('The Saviour Foundation', 'Hurricane Mary Disaster Relief', 500000, 129000, 'Victoria', true, 3),
('Joseph & Jospeh Organisation', 'Free Mammo for 2000 Women', 1000000, 450320, 'Queensland', true, 1);