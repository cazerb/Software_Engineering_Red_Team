-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 05, 2020 at 07:49 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

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
  `email` varchar(40) DEFAULT NULL,
  `phone` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `presenter`
--

INSERT INTO `presenter` (`presenterID`, `name`, `email`, `phone`) VALUES
(18, 'John Doe', 'Jdoe@test.com', 'null');

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
(194, 123, NULL),
(195, 456, 456),
(196, 999, NULL),
(197, 2, 45);

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
  `presenterID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sessionID`, `sessionName`, `startTime`, `endTime`, `roomID`, `presenterID`) VALUES
(5, 'Test null session', '00:00:00', '00:00:00', NULL, NULL),
(6, 'test', '00:00:00', '00:00:00', 197, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `presenter`
--
ALTER TABLE `presenter`
  ADD PRIMARY KEY (`presenterID`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`roomID`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sessionID`),
  ADD KEY `roomID` (`roomID`),
  ADD KEY `presenterID` (`presenterID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `presenter`
--
ALTER TABLE `presenter`
  MODIFY `presenterID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `roomID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=198;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `sessionID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`roomID`) REFERENCES `rooms` (`roomID`) ON DELETE CASCADE,
  ADD CONSTRAINT `sessions_ibfk_2` FOREIGN KEY (`presenterID`) REFERENCES `presenter` (`presenterID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
