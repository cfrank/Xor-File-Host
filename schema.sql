-- Host: localhost
-- Generation Time: May 29, 2016 at 03:00 PM
-- Server version: 10.1.14-MariaDB
-- PHP Version: 7.0.7

--
-- Database: `xor`
--

-- --------------------------------------------------------

--
-- Table structure for table `albumids`
--

CREATE TABLE `albumids` (
  `id` char(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
  `albumid` char(10) COLLATE utf8_bin DEFAULT NULL,
  `hash` char(40) COLLATE utf8_bin DEFAULT NULL,
  `filename` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `size` int(10) UNSIGNED DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
