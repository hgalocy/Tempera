CREATE database tempera;

/*Create Account Table*/
account, CREATE TABLE `account` (
  `Username` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `FirstName` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `LastName` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PhoneNumber` varchar(10) DEFAULT NULL,
  `Email` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `IsArtist` tinyint(1) NOT NULL,
  `Salt` varchar(64) NOT NULL,
  `UserID` varchar(64) NOT NULL,
  `Delivery` varchar(64) DEFAULT NULL,
  `Photo` mediumblob,
  `Bio` text,
  `location` text,
  `SpecTextile` tinyint(1) DEFAULT NULL,
  `SpecSculpture` tinyint(1) DEFAULT NULL,
  `SpecPainting` tinyint(1) DEFAULT NULL,
  `SpecDigitalPainting` tinyint(1) DEFAULT NULL,
  `SpecEmbroidery` tinyint(1) DEFAULT NULL,
  `SpecPottery` tinyint(1) DEFAULT NULL,
  `PasswordHash` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `SK_Email` (`Email`),
  UNIQUE KEY `SK_Username` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

/*Create Items Table*/
items, CREATE TABLE `items` (
  `ItemID` varchar(64) NOT NULL,
  `ItemName` varchar(20) NOT NULL,
  `ItemDescription` tinytext,
  `Painting` tinyint(1) DEFAULT NULL,
  `DigitalPainting` tinyint(1) DEFAULT NULL,
  `Pottery` tinyint(1) DEFAULT NULL,
  `Textile` tinyint(1) DEFAULT NULL,
  `Sculpture` tinyint(1) DEFAULT NULL,
  `Embroidery` tinyint(1) DEFAULT NULL,
  `SoldOut` tinyint(1) DEFAULT NULL,
  `Price` decimal(65,2) NOT NULL,
  `ArtistID_fk` varchar(64) DEFAULT NULL,
  `Image` mediumblob,
  PRIMARY KEY (`ItemID`),
  KEY `Artist` (`ArtistID_fk`),
  CONSTRAINT `Artist` FOREIGN KEY (`ArtistID_fk`) REFERENCES `account` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


/*Ceate Favorites Table*/
favorites, CREATE TABLE `favorites` (
  `UserID_fk` varchar(64) NOT NULL,
  `ItemID_fk` varchar(64) NOT NULL,
  KEY `UserID_fk` (`UserID_fk`),
  KEY `FK_Item` (`ItemID_fk`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`UserID_fk`) REFERENCES `account` (`UserID`),
  CONSTRAINT `FK_Item` FOREIGN KEY (`ItemID_fk`) REFERENCES `items` (`ItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


/*Create Review Table*/
reviews, CREATE TABLE `reviews` (
  `ReviewText` text,
  `ReviewDate` timestamp NOT NULL,
  `ReviewRating` enum('1','2','3','4','5') NOT NULL,
  `ReviewerID_fk` varchar(64) DEFAULT NULL,
  `ItemID_fk` varchar(64) DEFAULT NULL,
  KEY `Reviewer` (`ReviewerID_fk`),
  KEY `ItemID_fk` (`ItemID_fk`),
  CONSTRAINT `ItemID_fk` FOREIGN KEY (`ItemID_fk`) REFERENCES `items` (`ItemID`),
  CONSTRAINT `Reviewer` FOREIGN KEY (`ReviewerID_fk`) REFERENCES `account` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

/*Create AddUser Procedure*/
addUser, STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION, CREATE DEFINER=`root`@`localhost` PROCEDURE `addUser`(
    IN pUsername varchar(40),
    IN pFirstName varchar(40),
    IN pLastName varchar(40),
    IN pEmail varchar(40),
    IN pPhoneNumber varchar(10),
    IN pIsArtist tinyint(1),
    IN pPassword varchar(40),
    IN pDelivery varchar(64),
    IN pPhoto BLOB,
    IN pBio TEXT,
    IN pLocation TEXT,
    IN pSpecPainting tinyint(1),
    IN pSpecDigitalPainting tinyint(1),
    IN pSpecTextile tinyint(1),
    IN pSpecEmbroidery tinyint(1), 
    IN pSpecPottery tinyint(1),
    IN pSpecSculpture tinyint(1),
    OUT responseMessage varchar(250)
    )
BEGIN
    
    DECLARE salt VARCHAR(64);
    DECLARE userID VARCHAR(64);
    
    SET salt = UUID();
    SET userID = UUID();
    
    INSERT INTO tempera.account (Username, FirstName, LastName, Email, IsArtist, Salt,
    UserID, PasswordHash, Delivery, Photo, Bio, Location, SpecPainting, SpecDigitalPainting,
    SpecTextile, SpecEmbroidery, SpecPottery, SpecSculpture, PhoneNumber)
    VALUES (pUsername, pFirstName, pLastName, pEmail, pIsArtist, salt, userID,
    SHA2(CONCAT( pPassword, CAST(salt AS CHAR(40))), 512),
    pDelivery, pPhoto, pBio, @pLocation, pSpecPainting, pSpecDigitalPainting, pSpecTextile,
    pSpecEmbroidery, pSpecPottery, pSpecSculpture, pPhoneNumber);
    
END, utf8mb4, utf8mb4_0900_ai_ci, utf8mb4_0900_ai_ci


/*Create AddItem Procedure*/
addItem, STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION, CREATE DEFINER=`root`@`localhost` PROCEDURE `addItem`(
    IN pItemName varchar(20),
    IN pItemDescription Text,
    IN pPainting tinyint(1),
    IN pDigitalPainting tinyint(1),
    IN pPottery tinyint(1),
    IN pTextile tinyint(1),
    IN pSculpture tinyint(1),
    IN pEmbroidery tinyint(1),
    IN pImage MediumBLOB,
    IN pPrice decimal(65,2),
    IN psoldOut tinyint(1),
    IN pUsername varchar(40),
    IN pPassword varchar(40),
    OUT responseMessage varchar(250)
    )
BEGIN

    DECLARE itemID VARCHAR(64);
    DECLARE pUserID VARCHAR(64);
    
    SELECT UserID INTO pUserID FROM tempera.account WHERE Username = pUsername AND PasswordHash = SHA2(CONCAT( pPassword, CAST(salt AS CHAR(40))), 512);
    
    SET itemID = UUID();
    
    INSERT INTO tempera.items (ItemName, ItemDescription, Painting, DigitalPainting, Pottery,
    Textile, Sculpture, Embroidery, Image, Price, SoldOut, ItemID, ArtistID_fk)
    VALUES (pItemName, pItemDescription, pPainting, pDigitalPainting, pPottery,
    pTextile, pSculpture, pEmbroidery, pImage, pPrice, pSoldOut, itemID, pUserID);
    
END, utf8mb4, utf8mb4_0900_ai_ci, utf8mb4_0900_ai_ci
