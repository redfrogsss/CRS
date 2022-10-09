-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Oct 09, 2022 at 05:02 PM
-- Server version: 8.0.30
-- PHP Version: 8.0.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crs`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int NOT NULL,
  `user_a_id` int DEFAULT NULL,
  `user_b_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id`, `user_a_id`, `user_b_id`) VALUES
(1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `input_queue`
--

CREATE TABLE `input_queue` (
  `id` int NOT NULL,
  `chat_id` int DEFAULT NULL,
  `message` text,
  `user_id` int DEFAULT NULL,
  `done` tinyint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `input_queue`
--

INSERT INTO `input_queue` (`id`, `chat_id`, `message`, `user_id`, `done`) VALUES
(3, 1, '我想要恐怖片', 2, 1),
(4, 1, '我想要恐怖片', 1, 1),
(5, 1, '我想要爱情电影', 2, 1),
(6, 1, '我想要爱情电影', 2, 1),
(7, 1, '我想要爱情电影', 2, 1),
(8, 1, 'action movie plz', 2, 1),
(9, 1, '我想要爱情电影', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int NOT NULL,
  `chat_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `content` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `chat_id`, `user_id`, `type`, `content`, `created_at`) VALUES
(1, 1, 2, 'text', '[Recommend]:\n卡里加里博士的小屋\n木乃伊（1999年斯蒂芬·索莫斯执导的电影）\n黑暗乡村\n灵幻夹克\n洛基恐怖秀\n四人餐桌\n美国黑帮\n盖棺了结\n诺斯费拉图（1979年维尔内纳·赫尔措格导演电影）\n费城故事（1940年乔治·丘克执导美国电影）\n', '2022-10-10 00:13:23'),
(2, 1, 2, 'text', '帮 我 把 这 个 小 妹 妹 换 衣 服 ， 可 是 我 有 点 吃 不 消 。', '2022-10-10 00:16:05'),
(3, 1, 1, 'text', '我想要恐怖片', '2022-10-10 00:22:31'),
(4, 1, 1, 'text', '[Recommend]:\n木乃伊（1999年斯蒂芬·索莫斯执导的电影）\n卡里加里博士的小屋\n旧日噩梦\n黑色安息日（意大利恐怖电影）\n新浪花金融道(0)\n致命切割\n鬼作秀2\n内陆（意大利2011年艾曼纽尔·克里亚勒斯执导电影）\n斯巴达克斯（2004年美国罗伯特·多恩海姆导演电影）\n重返奥兹国\n', '2022-10-10 00:23:05'),
(5, 1, 1, 'text', '还 有 租 车 的 时 候 太 难 骑 ， 太 怕 员 骄 傲 ， 想 要 搞 几 条 狗 ， 有 一 集 会 干', '2022-10-10 00:26:33'),
(6, 1, 1, 'text', '我想要爱情电影', '2022-10-10 00:33:46'),
(7, 1, 2, 'text', '[Recommend]:\n断背山（2005年李安执导美国电影）\n来电惊魂\n浓情巧克力（美国2000年朱丽叶·比诺什主演电影）\n神秘村\n堕入地狱\n花月佳期（1967年黄尧执导电影）\n见鬼\n战地情人\n绿卡（电影）\n湖边的少女\n', '2022-10-10 00:34:15'),
(8, 1, 2, 'text', '给 他 ， 让 他 软 玉 支 持 一 下 来 ， 让 他 软 玉 支 持 一 下 。', '2022-10-10 00:36:54'),
(9, 1, 1, 'text', '我想要爱情电影', '2022-10-10 00:44:03'),
(10, 1, 2, 'text', '[Recommend]:\n断背山（2005年李安执导美国电影）\n浓情巧克力（美国2000年朱丽叶·比诺什主演电影）\n猎头游戏\n当哈利遇到莎莉\n大叔，我爱你\n绿卡（电影）\n情书（1997年韩国电影）\n云上的日子（1995年法国米开朗基罗·安东尼奥尼执导电影）\n木乃伊（1999年斯蒂芬·索莫斯执导的电影）\n堕入地狱\n', '2022-10-10 00:44:30'),
(11, 1, 2, 'text', '找 男 朋 友 的 ， 但 是 他 的 心 都 有 了 ， 我 无 法 理 解 。', '2022-10-10 00:46:58'),
(12, 1, 1, 'text', '我想要爱情电影', '2022-10-10 00:49:07'),
(13, 1, 2, 'text', '[Recommend]:\n断背山（2005年李安执导美国电影）\n木乃伊（1999年斯蒂芬·索莫斯执导的电影）\n浓情巧克力（美国2000年朱丽叶·比诺什主演电影）\n神秘村\n绿卡（电影）\n云上的日子（1995年法国米开朗基罗·安东尼奥尼执导电影）\n爱情（1948年意大利电影）\n棺木\n圣体(2011)\n呼啸山庄（1954年版墨西哥电影）\n', '2022-10-10 00:49:35'),
(14, 1, 2, 'text', '却 偏 向 于 发 觉 他 非 常 珍 惜 ， 他 真 的 很 彻 底 ， 只 是 太 理 想 获 得 了 一 把', '2022-10-10 00:53:03'),
(15, 1, 1, 'text', 'action movie plz', '2022-10-10 00:53:22'),
(16, 1, 2, 'text', '[Recommend]:\n浓情巧克力（美国2000年朱丽叶·比诺什主演电影）\n怪兽电力公司\n罗马假日（1987年美国电视电影）\n两小无猜（2003年杨·塞谬尔导演电影）\n万有引力（2011年赵天宇导演电影）\n机器人之恋\n失乐园（张吉秀执导电影）\n米尔克（美国2008年Gus Van Sant执导电影）\n白雪公主斗牛记\n熊猫家族\n', '2022-10-10 00:53:51'),
(17, 1, 2, 'text', '。', '2022-10-10 00:54:18'),
(18, 1, 1, 'text', '我想要爱情电影', '2022-10-10 00:54:41'),
(19, 1, 2, 'text', '[Recommend]:\n小姐弟荒原历险\n花月佳期（1967年黄尧执导电影）\n浓情巧克力（美国2000年朱丽叶·比诺什主演电影）\n我心狂野（1990年大卫·林奇执导美国电影）\n大叔，我爱你\n怪物史莱克（2001年上映动画电影）\n理发师（2006年陈坤主演电影）\n咱们结婚吧（2015年刘江执导的爱情电影）\n来电惊魂\n当哈利遇到莎莉\n', '2022-10-10 00:55:09'),
(20, 1, 2, 'text', '一 般 都 是 按 照 一 定 程 度 的 ， 毕 竟 有 无 穷 无 穷 嘛 。', '2022-10-10 00:57:41');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` text,
  `password` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`) VALUES
(1, 'Jacky', 'test@test.com', '123456'),
(2, 'SystemUser10173', 'SystemUser10173@crs.com', '123456');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `input_queue`
--
ALTER TABLE `input_queue`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `input_queue`
--
ALTER TABLE `input_queue`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
