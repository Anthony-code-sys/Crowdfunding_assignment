
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crowdfundraisers_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Health'),
(2, 'Education'),
(3, 'Environment'),
(4, 'Animal Welfare'),
(5, 'Arts and Culture');

-- --------------------------------------------------------

--
-- Table structure for table `donation`
--

CREATE TABLE `donation` (
  `DONATION_ID` int(11) NOT NULL,
  `DATE` date NOT NULL,
  `AMOUNT` decimal(10,2) NOT NULL,
  `GIVER` varchar(100) NOT NULL,
  `FUNDRAISER_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donation`
--

INSERT INTO `donation` (`DONATION_ID`, `DATE`, `AMOUNT`, `GIVER`, `FUNDRAISER_ID`) VALUES
(1, '2024-09-10', 100.00, 'Alice Thompson', 1),
(2, '2024-09-12', 250.00, 'Bob Williams', 2),
(3, '2024-09-15', 50.00, 'Charlie King', 3),
(4, '2024-09-17', 300.00, 'David Johnson', 4),
(5, '2024-09-18', 75.00, 'Eve Brown', 5),
(6, '2024-09-20', 400.00, 'Frank White', 6),
(7, '2024-09-22', 150.00, 'Grace Black', 7),
(8, '2024-09-23', 200.00, 'Hank Green', 8),
(9, '2024-09-25', 500.00, 'Ivy Adams', 9),
(10, '2024-09-26', 350.00, 'Jack Blue', 10),
(11, '2024-10-10', 500.00, 'John Doe', 3);

-- --------------------------------------------------------

--
-- Table structure for table `fundraisers`
--

CREATE TABLE `fundraisers` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `organizer` varchar(255) NOT NULL,
  `caption` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `current_fund` bigint(20) NOT NULL,
  `active` tinyint(4) NOT NULL,
  `target_fund` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `fundraisers`
--

INSERT INTO `fundraisers` (`id`, `category_id`, `organizer`, `caption`, `city`, `current_fund`, `active`, `target_fund`) VALUES
(1, 1, 'Jayke Man', 'Helping Kids Win Fames', 'Sangotedo', 15000, 1, 90000),
(2, 2, 'EduFund', 'Help students get scholarships', 'Los Angeles', 30000, 1, 100000),
(3, 3, 'Jayke Man', 'Helping Kids Win Fames', 'Belbourne', 5000, 1, 500000),
(4, 4, 'Animal Rescue', 'Save abandoned pets', 'Miami', 20000, 1, 75000),
(5, 5, 'Art Foundation', 'Promote local artists', 'Chicago', 8000, 1, 40000),
(6, 2, 'peter_johnson', 'Johnson Wildlife Fund', 'Dallas', 4000, 1, 20000),
(7, 4, 'anna_taylor', 'Taylor Homeless Shelter', 'Austin', 13000, 1, 25000),
(8, 1, 'linda_evans', 'Evans Childcare Fund', 'San Diego', 9000, 1, 18000),
(9, 3, 'mark_white', 'White Education Trust', 'San Francisco', 15000, 1, 40000),
(10, 4, 'chris_green', 'Green Tech Fund', 'Boston', 5000, 1, 35000),
(11, 1, 'John Doe', 'Help Build a School in Rural Area', 'New York', 5000, 1, 10000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donation`
--
ALTER TABLE `donation`
  ADD PRIMARY KEY (`DONATION_ID`),
  ADD KEY `FUNDRAISER_ID` (`FUNDRAISER_ID`);

--
-- Indexes for table `fundraisers`
--
ALTER TABLE `fundraisers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donation`
--
ALTER TABLE `donation`
  MODIFY `DONATION_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `fundraisers`
--
ALTER TABLE `fundraisers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `donation`
--
ALTER TABLE `donation`
  ADD CONSTRAINT `donation_ibfk_1` FOREIGN KEY (`FUNDRAISER_ID`) REFERENCES `fundraisers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `fundraisers`
--
ALTER TABLE `fundraisers`
  ADD CONSTRAINT `fundraisers_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
