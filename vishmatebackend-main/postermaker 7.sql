-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 14, 2024 at 01:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `postermaker`
--

-- --------------------------------------------------------

--
-- Table structure for table `addlocation`
--

CREATE TABLE `addlocation` (
  `addlocation_id` int(11) NOT NULL,
  `addlocation` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `add_bussiness`
--

CREATE TABLE `add_bussiness` (
  `bussiness_id` int(11) NOT NULL,
  `customer_id` int(20) NOT NULL,
  `upload_logo` varchar(255) NOT NULL,
  `footer_image` varchar(300) NOT NULL,
  `selected_category` varchar(20) NOT NULL,
  `bussiness_name` varchar(20) NOT NULL,
  `address` varchar(20) NOT NULL,
  `mobile_no` varchar(20) NOT NULL,
  `alternate_no` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `website` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `add_bussiness`
--

INSERT INTO `add_bussiness` (`bussiness_id`, `customer_id`, `upload_logo`, `footer_image`, `selected_category`, `bussiness_name`, `address`, `mobile_no`, `alternate_no`, `email`, `website`, `created_at`, `updated_at`) VALUES
(1, 1, '17e115a2-6d80-4aa3-8bf3-35f7c63e80a2-VM 10.1.png', '5eb701b6-af13-4bd9-a1a4-24ebe9305751-Kst 30.jpg', 'aaa', 'bbb', 'ccc', '12345678', '12345678', 'demo@admin.com', 'demo.com', '2024-06-08 05:16:42', '2024-06-08 05:23:39');

-- --------------------------------------------------------

--
-- Table structure for table `admin_user`
--

CREATE TABLE `admin_user` (
  `adminuser_id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `admin_email` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `category` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_user`
--

INSERT INTO `admin_user` (`adminuser_id`, `user_name`, `admin_email`, `password`, `category`, `created_at`, `updated_at`) VALUES
(3, 'marshal', 'marshal', '$2b$10$fsj.oAoYETAybJeCpdM5f.ipy.SulWhT/nJlNP8PF3ZEDZPDc.lIS', 'Jewellery', '2024-05-17 17:25:26', '2024-05-17 17:25:26'),
(4, 'vinsup', 'tesmdr@gmail.com', '$2b$10$cLXLzquHG2JyO/eUbXhuquepjGPgnzHMxC05cqzpxi4krAU7gBl4S', 'Jewellery', '2024-05-17 17:26:13', '2024-05-17 17:26:13');

-- --------------------------------------------------------

--
-- Table structure for table `advertisement`
--

CREATE TABLE `advertisement` (
  `advertisement_id` int(11) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category_frame`
--

CREATE TABLE `category_frame` (
  `categoryframe_id` int(11) NOT NULL,
  `category_type` varchar(20) NOT NULL,
  `title` varchar(30) NOT NULL,
  `language` varchar(20) NOT NULL,
  `frame_image` varchar(255) NOT NULL,
  `footer_image` varchar(255) NOT NULL,
  `color_code` varchar(20) NOT NULL,
  `font_style` varchar(20) NOT NULL,
  `font_size` varchar(20) NOT NULL,
  `logo_x` int(10) NOT NULL,
  `logo_y` int(10) NOT NULL,
  `date_x` int(10) NOT NULL,
  `date_y` int(10) NOT NULL,
  `footer_x` int(10) NOT NULL,
  `footer_y` int(10) NOT NULL,
  `gold_x` int(10) NOT NULL,
  `gold_y` int(10) NOT NULL,
  `silver_x` int(10) NOT NULL,
  `silver_y` int(10) NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category_frame`
--

INSERT INTO `category_frame` (`categoryframe_id`, `category_type`, `title`, `language`, `frame_image`, `footer_image`, `color_code`, `font_style`, `font_size`, `logo_x`, `logo_y`, `date_x`, `date_y`, `footer_x`, `footer_y`, `gold_x`, `gold_y`, `silver_x`, `silver_y`, `status`, `created_at`, `updated_at`) VALUES
(5, 'Jewellery', 'political', 'English', '636d6062-6b52-450c-9448-2ae15fab3013-S4 (1).png', 'none', '#FFFFFF', 'Lora-Bold', '20', 40, 39, 610, 59, 70, 932, 328, 217, 748, 217, 'active', '2024-05-27 17:09:58', '2024-05-28 07:52:18'),
(6, 'Jewellery', 'political', 'English', '336f616c-b4b2-4331-a501-381334b34c95-S1 (1).jpg', 'none', '#FFFFFF', 'Lora-Bold', '20', 40, 39, 610, 59, 70, 932, 328, 217, 748, 217, 'active', '2024-05-27 17:11:26', '2024-05-28 07:52:30'),
(10, 'Restaurants', 'political', 'English', '675062cf-ea73-427d-9ca0-85567727fc5d-Group 7.png', 'none', '345666', 'Roboto', '23', 12, 22, 23, 33, 33, 33, 33, 33, 33, 33, 'active', '2024-05-28 06:49:06', '2024-05-28 07:52:35'),
(11, 'Restaurants', 'Vijay', 'English', 'd6cb75f9-e303-4d92-9181-6ccc8aac2c2b-WhatsApp_Image_2023-11-28_at_13.08.28_f3225d3e-removebg-preview.png', 'none', '7989', 'Nunito', '34', 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 'active', '2024-05-28 06:51:49', '2024-05-28 07:52:50');

-- --------------------------------------------------------

--
-- Table structure for table `category_post`
--

CREATE TABLE `category_post` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(20) NOT NULL,
  `category_image` varchar(255) NOT NULL,
  `category_status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category_post`
--

INSERT INTO `category_post` (`category_id`, `category_name`, `category_image`, `category_status`, `created_at`, `updated_at`) VALUES
(12, 'snaky', 'd5c63def-6df9-4800-989b-564d6a7dd51e-download (13).png', 'active', '2024-05-29 07:22:05', '2024-05-29 07:22:05'),
(13, 'jewel', '3d021c3a-d853-4046-87db-79986a937cf0-panda austor.png', 'active', '2024-05-29 09:27:40', '2024-05-29 09:27:40');

-- --------------------------------------------------------

--
-- Table structure for table `goldrate`
--

CREATE TABLE `goldrate` (
  `goldrate_id` int(11) NOT NULL,
  `time` varchar(20) NOT NULL,
  `location` varchar(20) NOT NULL,
  `goldrate` varchar(20) NOT NULL,
  `silverrate` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

CREATE TABLE `language` (
  `language_id` int(11) NOT NULL,
  `language_name` varchar(20) NOT NULL,
  `language_image` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `language`
--

INSERT INTO `language` (`language_id`, `language_name`, `language_image`, `status`, `created_at`, `updated_at`) VALUES
(29, 'english', '5a762183-14d0-4537-9d4f-6b734e420bd7-DEC 4 tiger cafe.jpg', 'active', '2024-05-24 10:03:10', '2024-05-29 08:03:28'),
(30, 'marshy', '7c06e304-8787-469a-86b9-367f46f430ea-download.jpg', 'active', '2024-05-27 12:09:43', '2024-05-29 07:12:53'),
(32, 'dinesh', 'a06c77ce-b1e7-4ca3-a1e8-fb96466cb7df-maxresdefault (1).jpg', 'active', '2024-05-29 05:28:28', '2024-05-29 05:28:28');

-- --------------------------------------------------------

--
-- Table structure for table `market_place`
--

CREATE TABLE `market_place` (
  `marketplace_id` int(11) NOT NULL,
  `service_name` varchar(20) NOT NULL,
  `price_amount` varchar(20) NOT NULL,
  `selected_image` varchar(255) NOT NULL,
  `about` varchar(1000) NOT NULL,
  `tools_used` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `market_place`
--

INSERT INTO `market_place` (`marketplace_id`, `service_name`, `price_amount`, `selected_image`, `about`, `tools_used`, `status`, `created_at`, `updated_at`) VALUES
(4, 'Theatre', '299', 'c09d0979-8ac0-4759-ab39-a36961876671-Group 8.png', 'dgd', 'jkhfvf', 'active', '2024-05-18 09:27:09', '2024-05-28 12:28:09'),
(5, 'Madhu', '5655', 'f43967c8-2c7e-485b-af05-a88e49b3d70d-Screenshot 2024-05-05 192550.png', 'ert', 'fff', 'inactive', '2024-05-18 10:28:08', '2024-05-28 12:28:08'),
(7, 'Santhosh', '150', 'e9a0c19c-c080-49f7-948c-fd2ea9cd89ad-Group 8.png', 'ert', 'hjjb', 'active', '2024-05-21 10:10:57', '2024-05-22 07:03:37'),
(8, 'Santhosh', '150', 'f025ee5f-71a0-44e5-a9c9-0c7aa65cfbff-Group 8.png', 'ert', 'hjjb', 'active', '2024-05-21 10:11:05', '2024-05-21 10:11:05'),
(10, 'web_development', '5655', '3becf8d0-d88c-471b-80ca-26fc02130743-ADAM & EVE Poster 2.jpg', 'web', 'hjjb', 'active', '2024-05-22 07:37:56', '2024-05-22 07:39:10'),
(11, 'dinesh', '232', 'b68c14d3-7497-4825-b90c-f2042fcc770b-WhatsApp_Image_2023-11-28_at_13.08.28_f3225d3e-removebg-preview.png', 'eee', 'eee', 'active', '2024-05-28 13:00:41', '2024-05-28 13:00:41');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `news_id` int(11) NOT NULL,
  `news_image` varchar(255) NOT NULL,
  `heading` varchar(20) NOT NULL,
  `tagline` varchar(5000) NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `signupdata`
--

CREATE TABLE `signupdata` (
  `signupdata_id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `mobilenumber` varchar(20) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `signupdata`
--

INSERT INTO `signupdata` (`signupdata_id`, `name`, `mobilenumber`, `email`, `created_at`, `Updated_at`) VALUES
(1, 'Test Name', '1234567890', 'test@example.com', '2024-05-15 08:34:38', '2024-05-15 08:34:38'),
(2, 'Test Name', '1234567890', 'test@example.com', '2024-05-15 09:34:29', '2024-05-15 09:34:29'),
(3, 'Test Name', '1234567890', 'test@example.com', '2024-05-15 09:43:49', '2024-05-15 09:43:49'),
(4, 'Test Name', '1234567890', 'test@example.com', '2024-05-15 09:45:35', '2024-05-15 09:45:35'),
(5, 'Test Name', '1234567890', 'test@example.com', '2024-05-15 09:49:19', '2024-05-15 09:49:19'),
(6, 'Test Name', '1234567890', 'test@example.com', '2024-05-15 09:52:11', '2024-05-15 09:52:11'),
(7, 'Test Name', '1234567890', 'test@example.com', '2024-05-15 09:55:34', '2024-05-15 09:55:34'),
(8, 'Test Name', '1234567890', 'test@example.com', '2024-05-15 09:59:07', '2024-05-15 09:59:07'),
(9, 'Test Name', '1234567890', 'test@example.com', '2024-05-15 10:18:02', '2024-05-15 10:18:02'),
(10, 'Test Name', '1234567890', 'test@example.com', '2024-05-15 10:19:50', '2024-05-15 10:19:50'),
(11, 'Test Name', '1234567890', 'test@example.com', '2024-05-15 10:25:28', '2024-05-15 10:25:28'),
(12, 'Test Name', '1234567890', 'test@example.com', '2024-05-15 10:28:45', '2024-05-15 10:28:45'),
(13, 'Test Name', '1234567890', 'test@example.com', '2024-05-15 12:20:18', '2024-05-15 12:20:18'),
(14, 'Test Name', '1234567890', 'test@example.com', '2024-05-15 12:24:05', '2024-05-15 12:24:05'),
(15, 'Test Name', '1234567890', 'test@example.com', '2024-05-15 12:24:35', '2024-05-15 12:24:35'),
(16, 'Test Name', '1234567890', 'test@example.com', '2024-05-16 05:37:55', '2024-05-16 05:37:55'),
(17, 'Test Name', '1234567890', 'test@example.com', '2024-05-16 05:39:07', '2024-05-16 05:39:07'),
(18, 'Test Name', '1234567890', 'test@example.com', '2024-05-16 06:21:32', '2024-05-16 06:21:32'),
(19, 'Test Name', '1234567890', 'test@example.com', '2024-05-16 06:57:52', '2024-05-16 06:57:52'),
(20, 'Test Name', '1234567890', 'test@example.com', '2024-05-16 07:04:43', '2024-05-16 07:04:43');

-- --------------------------------------------------------

--
-- Table structure for table `userlogin`
--

CREATE TABLE `userlogin` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `privacy_status` varchar(20) DEFAULT NULL,
  `select_plan` varchar(20) DEFAULT NULL,
  `plan_price` varchar(20) NOT NULL,
  `subscription_id` varchar(20) DEFAULT NULL,
  `userstatus` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userlogin`
--

INSERT INTO `userlogin` (`customer_id`, `name`, `mobile`, `email`, `password`, `privacy_status`, `select_plan`, `plan_price`, `subscription_id`, `userstatus`, `created_at`, `updated_at`) VALUES
(1, 'demo', '1234567890', 'demo@gmail.com', '$2b$10$WTVlaMbGzVXTny.XmxsUpe8WYgAk5S9JmMmOyqyNV9eevRU4IeCf6', 'accepted', 'silver', '299', 'sub_OHRbl5sKGsV9CI', 'paid', '2024-05-11 05:39:57', '2024-06-01 13:01:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addlocation`
--
ALTER TABLE `addlocation`
  ADD PRIMARY KEY (`addlocation_id`);

--
-- Indexes for table `add_bussiness`
--
ALTER TABLE `add_bussiness`
  ADD PRIMARY KEY (`bussiness_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `admin_user`
--
ALTER TABLE `admin_user`
  ADD PRIMARY KEY (`adminuser_id`);

--
-- Indexes for table `advertisement`
--
ALTER TABLE `advertisement`
  ADD PRIMARY KEY (`advertisement_id`);

--
-- Indexes for table `category_frame`
--
ALTER TABLE `category_frame`
  ADD PRIMARY KEY (`categoryframe_id`);

--
-- Indexes for table `category_post`
--
ALTER TABLE `category_post`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `goldrate`
--
ALTER TABLE `goldrate`
  ADD PRIMARY KEY (`goldrate_id`);

--
-- Indexes for table `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`language_id`);

--
-- Indexes for table `market_place`
--
ALTER TABLE `market_place`
  ADD PRIMARY KEY (`marketplace_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`news_id`);

--
-- Indexes for table `signupdata`
--
ALTER TABLE `signupdata`
  ADD PRIMARY KEY (`signupdata_id`);

--
-- Indexes for table `userlogin`
--
ALTER TABLE `userlogin`
  ADD PRIMARY KEY (`customer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addlocation`
--
ALTER TABLE `addlocation`
  MODIFY `addlocation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `add_bussiness`
--
ALTER TABLE `add_bussiness`
  MODIFY `bussiness_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `admin_user`
--
ALTER TABLE `admin_user`
  MODIFY `adminuser_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `advertisement`
--
ALTER TABLE `advertisement`
  MODIFY `advertisement_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category_frame`
--
ALTER TABLE `category_frame`
  MODIFY `categoryframe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `category_post`
--
ALTER TABLE `category_post`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `goldrate`
--
ALTER TABLE `goldrate`
  MODIFY `goldrate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `language`
--
ALTER TABLE `language`
  MODIFY `language_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `market_place`
--
ALTER TABLE `market_place`
  MODIFY `marketplace_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `news_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `signupdata`
--
ALTER TABLE `signupdata`
  MODIFY `signupdata_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `userlogin`
--
ALTER TABLE `userlogin`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `add_bussiness`
--
ALTER TABLE `add_bussiness`
  ADD CONSTRAINT `add_bussiness_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `userlogin` (`customer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
