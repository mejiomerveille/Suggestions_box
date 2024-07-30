-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2024 at 06:34 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `suggestion-box`
--

-- --------------------------------------------------------

--
-- Table structure for table `suggestions`
--

CREATE TABLE `suggestions` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `nombre_de_votes` int(11) NOT NULL DEFAULT 0,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suggestions`
--

INSERT INTO `suggestions` (`id`, `content`, `user_id`, `nombre_de_votes`, `status`, `created`, `updated`) VALUES
(1, 'Améliorer la communication en créant un forum en ligne pour les questions entre les cours.', 1, 3, 'pending', '2024-07-27 21:17:08', '2024-07-28 07:15:36'),
(3, 'Organiser des ateliers pratiques sur le développement mobile.', 1, 0, 'pending', '2024-07-28 07:43:14', '2024-07-28 07:43:14'),
(4, 'Expliquer le concept de la programmation orientée objet de manière plus claire avec des exemples.', 5, 1, 'pending', '2024-07-28 07:43:58', '2024-07-29 16:54:25'),
(5, 'Ajouter une nouvelle filiere a primetec', 1, 0, 'approved', '2024-07-29 16:55:24', '2024-07-29 16:56:48');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','admin','teacher') DEFAULT 'student',
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `created`, `updated`) VALUES
(1, 'Merveille', 'merveillecathy654@gmail.com', '$2b$10$SHqIrUQPKolpDUl6U/7Cb.HEjBA5F02LbbqcJE/VSYmyUVn0ed636', 'admin', '2024-07-27 21:10:28', '2024-07-27 21:10:28'),
(5, 'Essai', 'essai@gmail.com', '$2b$10$d0u3m98zm6KH9tLJvjoDiuG40ItO6froFAcz/vWDoP/dFJRTBiPMW', 'student', '2024-07-27 21:45:17', '2024-07-27 22:11:16'),
(6, 'leila', 'leila@gmail.com', '$2b$10$3vYhhzE.lv9sLPYXkdQhAedltLRY14rMjtJ.aD/waUsA4CdUQd.LO', 'teacher', '2024-07-27 21:52:41', '2024-07-27 21:52:41');

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `id` int(11) NOT NULL,
  `suggestion_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`id`, `suggestion_id`, `user_id`, `created`, `updated`) VALUES
(1, 1, 1, '2024-07-27 21:39:07', '2024-07-27 21:39:07'),
(2, 1, 6, '2024-07-27 22:04:28', '2024-07-27 22:04:28'),
(3, 1, 5, '2024-07-28 07:15:35', '2024-07-28 07:15:35'),
(5, 4, 1, '2024-07-29 16:54:24', '2024-07-29 16:54:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `suggestions`
--
ALTER TABLE `suggestions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Users_username_unique` (`username`),
  ADD UNIQUE KEY `Users_email_unique` (`email`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `suggestion_id` (`suggestion_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `suggestions`
--
ALTER TABLE `suggestions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `suggestions`
--
ALTER TABLE `suggestions`
  ADD CONSTRAINT `suggestions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`suggestion_id`) REFERENCES `suggestions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
