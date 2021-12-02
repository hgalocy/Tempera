-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: tempera
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping routines for database 'tempera'
--
/*!50003 DROP PROCEDURE IF EXISTS `addItem` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addItem`(
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
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addUser`(
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
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-29 20:44:16
