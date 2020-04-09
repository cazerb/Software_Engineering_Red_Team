-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2020 at 09:09 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `presenter`
--

CREATE TABLE `presenter` (
  `presenterID` int(10) NOT NULL,
  `name` varchar(25) NOT NULL,
  `email` varchar(40) NOT NULL,
  `phone` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `presenter`
--

INSERT INTO `presenter` (`presenterID`, `name`, `email`, `phone`) VALUES
(5, 'John Doe', 'does@gmail.com', '503-533-5333'),
(7, 'Jen Appleseed', 'appleseedj@wit.edu', '343-533-5333'),
(10, 'Jane Ellis', 'ellisj@wit.edu', '344-533-5555'),
(11, 'Cameron Liddell', 'liddellc@gmail.com', '123-424-5555');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `roomID` int(10) NOT NULL,
  `roomNumber` int(10) NOT NULL,
  `capacity` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`roomID`, `roomNumber`, `capacity`) VALUES
(202, 1, 50),
(203, 2, 50),
(205, 4, 50),
(209, 5, 50),
(210, 3, 50);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sessionID` int(10) NOT NULL,
  `sessionName` varchar(30) NOT NULL,
  `startTime` time DEFAULT NULL,
  `endTime` time DEFAULT NULL,
  `roomID` int(11) DEFAULT NULL,
  `presenterID` int(11) DEFAULT NULL,
  `startCount` int(5) DEFAULT NULL,
  `middleCount` int(5) DEFAULT NULL,
  `endCount` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sessionID`, `sessionName`, `startTime`, `endTime`, `roomID`, `presenterID`, `startCount`, `middleCount`, `endCount`) VALUES
(10, 'Test Driven Development', '09:00:00', '10:00:00', 202, 5, NULL, NULL, NULL),
(12, 'SWE', '14:00:00', '15:00:00', 205, 7, NULL, NULL, NULL),
(13, 'ACM', '08:00:00', '09:00:00', 209, 10, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `presenter`
--
ALTER TABLE `presenter`
  ADD PRIMARY KEY (`presenterID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`roomID`),
  ADD UNIQUE KEY `roomNumber` (`roomNumber`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sessionID`),
  ADD UNIQUE KEY `sessionName` (`sessionName`),
  ADD KEY `roomID` (`roomID`),
  ADD KEY `presenterID` (`presenterID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `presenter`
--
ALTER TABLE `presenter`
  MODIFY `presenterID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `roomID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=215;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `sessionID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`roomID`) REFERENCES `rooms` (`roomID`) ON DELETE SET NULL,
  ADD CONSTRAINT `sessions_ibfk_2` FOREIGN KEY (`presenterID`) REFERENCES `presenter` (`presenterID`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
