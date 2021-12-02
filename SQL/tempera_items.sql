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
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES ('e2ebcf90-3d15-11ec-926c-00ffe33bafc1','Beeg Stick','Like a stick... but bigger',0,0,0,0,1,0,0,199.99,'946c4c7a-3cfa-11ec-926c-00ffe33bafc1',_binary 'C:/Users/andre/Desktop/Jerry_Face.jpg'),('f73f3f9c-390b-11ec-98da-00ffe33bafc1','Stick','It is just a plain old stick',0,NULL,0,0,1,0,0,10.00,'aa929541-390b-11ec-98da-00ffe33bafc1',NULL);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-29 20:44:16
