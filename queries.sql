CREATE TABLE `admins` (
  `admin_user` varchar(100) DEFAULT NULL,
  `admin_pass` text
) ;
CREATE TABLE `routes` (
  `id` varchar(255) NOT NULL,
  `origin` varchar(100) DEFAULT NULL,
  `destination` varchar(100) DEFAULT NULL,
  `price_birr` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

CREATE TABLE `transactions` (
  `id` varchar(255) NOT NULL,
  `wallet_phone` varchar(15) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `type` enum('recharge','purchase') DEFAULT NULL,
  `reference_id` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wallet_phone` (`wallet_phone`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`wallet_phone`) REFERENCES `wallets` (`phone_number`) ON DELETE CASCADE
);


CREATE TABLE `wallets` (
  `phone_number` varchar(25) NOT NULL,
  `balance` decimal(10,2) DEFAULT '0.00',
  `last_recharge_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`phone_number`)
) ;
ALTER TABLE wallets ADD COLUMN pin_code VARCHAR(6);

CREATE TABLE `tickets` (
  `ticket_id` varchar(255) NOT NULL,
  `price` float DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `wallet` varchar(25) DEFAULT NULL,
  `routeid` varchar(255) DEFAULT NULL,
  `isexpired` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ticket_id`),
  KEY `wallet` (`wallet`),
  KEY `routeid` (`routeid`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`wallet`) REFERENCES `wallets` (`phone_number`) ON DELETE CASCADE,
  CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`routeid`) REFERENCES `routes` (`id`) ON DELETE CASCADE
);


