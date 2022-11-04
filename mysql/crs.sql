-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Nov 04, 2022 at 08:24 AM
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
(1, 1, 2),
(2, 1, 3),
(3, 1, 4),
(4, 1, 5),
(5, 1, 6),
(6, 1, 10),
(7, 12, 13);

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
(9, 1, '我想要爱情电影', 2, 1),
(10, 2, '你好', 3, 1),
(11, 2, '哈哈哈', 3, 1),
(12, 2, '有电影推荐吗？', 3, 1),
(13, 2, '我爱你', 3, 1),
(14, 2, '我爱你', 3, 1),
(15, 2, '有动作片推荐吗？', 3, 1),
(16, 1, '有恐怖片推荐吗？', 2, 1),
(17, 2, '有动作片推荐吗？', 3, 1),
(18, 1, '我想要爱情电影', 2, 1),
(19, 2, '有动作片推荐吗', 3, 1),
(20, 1, '有婚姻片推荐吗', 2, 1),
(21, 1, '我想要婚姻片', 2, 1),
(22, 1, '谢谢你', 2, 1),
(23, 3, '你好我想要恐怖片', 4, 1),
(24, 3, '有其他爱情电影吗', 4, 1),
(25, 3, '我想要其他动作片', 4, 1),
(26, 2, 'I want action movie', 3, 1),
(27, 4, '我想要恐怖片', 5, 1),
(28, 5, '你好我想要恐怖片', 6, 1),
(29, 5, '我想要其他喜剧电影', 6, 1),
(30, 5, '有没有推荐的爱情电影', 6, 1),
(31, 6, '我想要爱情电影', 10, 1),
(32, 6, '我想要爱情电影', 10, 1),
(33, 6, '我想要爱情电影', 10, 1),
(34, 6, '我想要动作电影', 10, 1),
(35, 6, '我想要爱情动作电影', 10, 1),
(36, 6, '我想要动作电影', 10, 1),
(37, 6, '你好我想要恐怖片', 10, 1),
(38, 6, '有动作片推荐吗', 10, 1),
(39, 6, '我想要婚姻片', 10, 1),
(40, 6, '我想要恐怖片', 10, 1),
(41, 6, '我想要恐怖片', 10, 1),
(42, 6, 'Sound Good', 1, 1),
(43, 6, '我想要恐怖片', 10, 1),
(44, 6, 'I don\'t like it', 10, 1),
(45, 6, 'Sound Good', 10, 1),
(46, 6, '忘记了', 10, 1),
(47, 6, '我也想要恐怖片', 10, 1),
(48, 6, 'I don\'t like it', 10, 1),
(49, 6, 'Sound Good', 10, 1),
(50, 6, 'I don\'t like it', 10, 1),
(51, 6, '我喜欢保罗·吉亚玛提的片', 10, 1),
(52, 6, 'Sound Good', 10, 1),
(53, 6, '我不喜欢', 10, 1),
(54, 6, '我喜欢', 10, 1),
(55, 7, '你好', 13, 1),
(56, 7, '我喜欢', 13, 1),
(57, 6, '我想要恐怖片', 10, 1);

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
(20, 1, 2, 'text', '一 般 都 是 按 照 一 定 程 度 的 ， 毕 竟 有 无 穷 无 穷 嘛 。', '2022-10-10 00:57:41'),
(21, 2, 1, 'text', '你好', '2022-10-12 22:42:34'),
(22, 2, 3, 'text', '[Recommend]:\n三十一\n美丽谎言（电影）\n内裤之穴\n猛鬼撞鬼\n罪与错\n魁拔Ⅲ战神崛起(2014)\n惊爆星期四\n雷诺阿（法国电影导演）\n九香\n三十八度\n', '2022-10-12 22:42:44'),
(23, 2, 3, 'text', '好 照 顾 自 己 的 小 女 孩 ， 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈', '2022-10-12 22:46:04'),
(24, 2, 1, 'text', '哈哈哈', '2022-10-12 22:48:00'),
(25, 2, 3, 'text', '[Recommend]:\n飞侠小白龙（1968年王风执导电影）\n幽灵僵尸\n三十八度\n魔棺\n莫小白的水怪日记\n生日快乐（2007年马楚成执导电影）\n迷失：过去，现在与未来(2008)\n败家仔\n“下次开船”港游记（1984年秦志钰执导电影）\n肥佬教授\n', '2022-10-12 22:48:09'),
(26, 2, 3, 'text', '哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈 哈', '2022-10-12 22:51:33'),
(27, 2, 1, 'text', '有电影推荐吗？', '2022-10-12 22:52:46'),
(28, 2, 3, 'text', '[Recommend]:\n穿越时光的地铁\n抗癌的我\n心底的逆流\n小城之春（1948年费穆执导电影）\n劳拉的星星（同名电影）\n移动迷宫3：死亡解药(2018)\n神父同志\n纽约，我爱你\n小马王\n狼的诱惑（韩国2004年姜栋元和李清娥主演爱情电影）\n', '2022-10-12 22:53:15'),
(29, 2, 1, 'text', '我爱你', '2022-10-12 22:55:06'),
(30, 2, 3, 'text', '[Recommend]:\n适合分手的季节\n幸福额度（2011年陈正道执导电影）\n伤心童话（2012年徐正超执导电影）\n烈火情人（英国1992年朱丽叶主演电影）\n酣歌畅戏\n台北异想\n暗恋桃花源（1992年林青霞主演电影）\n五百万美元的大丈夫\n天涯海角（1996年李志毅执导电影）\n新天生一对\n', '2022-10-12 22:55:29'),
(31, 2, 3, 'text', '的 我 吧 己 的 笑 。', '2022-10-12 22:56:31'),
(32, 2, 1, 'text', '我爱你', '2022-10-12 22:57:39'),
(33, 2, 3, 'text', '[Recommend]:\n酣歌畅戏\n傻瓜回忆录\n台北异想\n爆裂刑警\n冲向天外天\n适合分手的季节\n信天游（冯小宁执导电影）\n蒙娜丽莎（李缨执导电影）\n逆世界\n红河（2009年章家瑞执导电影）\n', '2022-10-12 22:58:02'),
(34, 2, 3, 'text', '的 爱 你 的 爱 你 的 爱 你 的 爱 我 的 爱 我 的 爱 我 的 爱 我 的 不 是 酸 ！', '2022-10-12 23:01:13'),
(35, 2, 1, 'text', '有动作片推荐吗？', '2022-10-12 23:02:09'),
(36, 1, 1, 'text', '有恐怖片推荐吗？', '2022-10-12 23:02:27'),
(37, 1, 2, 'text', '[Recommend]:\n双枪（2013年巴塔萨·科马库执导的美国电影）\n达拉斯买家俱乐部\n穿越时光的地铁\n杀破狼（2005年叶伟信执导电影）\n虎胆龙威5\n绝地战警2\n生死拳\n攻壳机动队SSS\n少林豪侠传\n剃头匠\n', '2022-10-12 23:02:36'),
(38, 2, 3, 'text', '[Recommend]:\n终结者2018\n终极斗士（1992年詹姆斯·马歇尔主演电影）\n双枪（2013年巴塔萨·科马库执导的美国电影）\n小城之春（1948年费穆执导电影）\n杀破狼（2005年叶伟信执导电影）\n武术之少年行\n皇家师姐2\n特工008\n剃头匠\n穿越时光的地铁\n', '2022-10-12 23:03:29'),
(39, 2, 1, 'text', '有动作片推荐吗？', '2022-10-12 23:04:32'),
(40, 1, 1, 'text', '我想要爱情电影', '2022-10-12 23:04:38'),
(41, 1, 2, 'text', '[Recommend]:\n云上的日子（1995年法国米开朗基罗·安东尼奥尼执导电影）\n断背山（2005年李安执导美国电影）\n浓情巧克力（美国2000年朱丽叶·比诺什主演电影）\n加勒比海盗3：世界的尽头\n绿卡（电影）\n廊桥遗梦（美国1995年克林特·伊斯特伍德执导爱情电影）\n婚姻生活（1970年弗朗索瓦·特吕弗导演电影）\n恋爱中的宝贝（2004年李少红执导电影）\n血与蜜之地\n命运呼叫转移\n', '2022-10-12 23:05:30'),
(42, 1, 2, 'text', '来 了 ， 你 有 什 么 指 望 吗 ？', '2022-10-12 23:06:54'),
(43, 2, 3, 'text', '[Recommend]:\n终结者2018\n武术之少年行\n通缉令（1984年金淑琪导演的电影）\n抗癌的我\n心底的逆流\n云上的日子（1995年法国米开朗基罗·安东尼奥尼执导电影）\n边境杀手\n剃头匠\n东方秃鹰\n变形金刚（2007年派拉蒙影业真人版电影）\n', '2022-10-12 23:07:20'),
(44, 2, 1, 'text', '有动作片推荐吗', '2022-10-12 23:08:26'),
(45, 2, 3, 'text', '[Recommend]:\n杀破狼（2005年叶伟信执导电影）\n武术之少年行\n拳霸（2003年拳霸系列电影的一部动作片）\n双枪（2013年巴塔萨·科马库执导的美国电影）\n机器人之恋\n狙击时刻(2014)\n公主日记2\n中环英雄（1991年香港电影）\n绝代双骄（1979年邵氏傅声、伍卫国主演的电影）\n虎胆龙威5\n', '2022-10-12 23:08:54'),
(46, 2, 3, 'text', '？', '2022-10-12 23:09:20'),
(47, 1, 1, 'text', '有婚姻片推荐吗', '2022-10-12 23:09:24'),
(48, 1, 2, 'text', '[Recommend]:\n当爱来的时候\n剃头匠\n婚姻生活（1970年弗朗索瓦·特吕弗导演电影）\n劳拉的星星（同名电影）\n心底的逆流\n游客（2014年法国喜剧电影）\n费城故事（1940年乔治·丘克执导美国电影）\n达拉斯买家俱乐部\n抗癌的我\n女友礼拜五\n', '2022-10-12 23:09:52'),
(49, 1, 2, 'text', '？', '2022-10-12 23:10:17'),
(50, 1, 1, 'text', '我想要婚姻片', '2022-10-12 23:10:56'),
(51, 1, 2, 'text', '[Recommend]:\n婚姻生活（1970年弗朗索瓦·特吕弗导演电影）\n泡妞达人\n游客（2014年法国喜剧电影）\n红楼梦Ⅲ 凤姐泼醋(0)\n萨凡纳（2013阿内特·霍华德-卡特导演美国电影）\n带子雄狼 父子连心(1972)\n我爱你（2011年秋昌民导演的韩国电影）\n杰克和露丝的情歌(2005)\n我的小小新娘\n卡米诺\n', '2022-10-12 23:11:28'),
(52, 1, 2, 'text', '， 你 帮 我 把 名 字 马 上 给 我 一 份 ， 我 不 贪 心 ， 我 不 太 担 心 ， 但 是 没 有', '2022-10-12 23:14:42'),
(53, 1, 1, 'text', '谢谢你', '2022-10-12 23:16:49'),
(54, 1, 2, 'text', '[Recommend]:\n天涯海角（1996年李志毅执导电影）\n泡妞达人\n我的小小新娘\n新郎上错床\n卡米诺\n女人的期待\n红楼梦Ⅲ 凤姐泼醋(0)\n冰血暴（美国1996年科恩兄弟执导电影）\n婚礼之后\n隔窗未了缘\n', '2022-10-12 23:17:04'),
(55, 1, 2, 'text', '， 我 要 我 心 情 不 安 ， 你 说 一 遍 不 激 的 。', '2022-10-12 23:18:54'),
(56, 3, 1, 'text', '你好我想要恐怖片', '2022-10-15 12:12:51'),
(57, 3, 4, 'text', '[Recommend]:\n木乃伊（1999年斯蒂芬·索莫斯执导的电影）\n卡里加里博士的小屋\n四人餐桌\n咒怨2 录像带版(2000)\n死寂（美国2007年詹姆斯·温执导电影）\n豹族(1942)\n超完美谋杀案\n洛基恐怖秀\n招魂（2005年大卫史密斯执导电影）\n致命切割\n', '2022-10-15 12:13:33'),
(58, 3, 4, 'text', '帮 我 把 这 个 老 失 败 告 一 下 ， 最 好 是 清 爽 的 那 种 带 来 了 灵 魂 无 穷 无 穷', '2022-10-15 12:17:21'),
(59, 3, 1, 'text', '有其他爱情电影吗', '2022-10-15 12:55:55'),
(60, 3, 4, 'text', '[Recommend]:\n神秘村\n致命切割\n旧日噩梦\n恋爱中的宝贝（2004年李少红执导电影）\n威尼斯疑魂\n盖棺了结\n机器人之恋\n罗马假日（1987年美国电视电影）\n三只猴子\n精灵鼠小弟（美国1999年E·B·怀特著童话改编好莱坞电影）\n', '2022-10-15 12:56:30'),
(61, 3, 4, 'text', '？', '2022-10-15 12:57:03'),
(62, 3, 1, 'text', '我想要其他动作片', '2022-10-15 12:57:44'),
(63, 3, 4, 'text', '[Recommend]:\n少林豪侠传\n碟中谍5：神秘国度(0)\n胖男孩快跑\n虎胆龙威（布鲁斯·威利斯主演虎胆龙威系列电影）\n蚁哥正传\n杀人三步曲\n虐童疑云\n僵尸大时代\n战士帮（1979年美国沃尔特·希尔执导电影）\n通缉令（1984年金淑琪导演的电影）\n', '2022-10-15 12:58:12'),
(64, 3, 4, 'text', '了 解 一 下 ， 不 太 真 实 ， 我 更 想 要 看 看 会 无 穷 好 吗 ？', '2022-10-15 13:00:42'),
(65, 2, 1, 'text', 'I want action movie', '2022-10-15 13:07:05'),
(66, 2, 3, 'text', '[Recommend]:\n悲惨世界（1934年的法国电影）\n列车惊魂\n亚特兰蒂斯之心（美国2001年斯科特·希克斯执导电影）\n火柴厂女工\n暗夜恐惧(0)\n简爱\n梦宅诡影\n跳支华尔兹\n我的童年（苏联1937年穆·顿斯柯依执导电影）\n小山回家\n', '2022-10-15 13:07:34'),
(67, 2, 3, 'text', '的 那 种 讲 脸 的 建 议 ， 毕 竟 血 溅 没 有 太 大 的 。', '2022-10-15 13:09:52'),
(68, 4, 1, 'text', '我想要恐怖片', '2022-10-15 14:27:21'),
(69, 4, 5, 'text', '[Recommend]:\n木乃伊（1999年斯蒂芬·索莫斯执导的电影）\n旧日噩梦\n独行杀手\n两杆大烟枪\n剃头匠\n命案目睹记(2004)\n非常舞者\n霓虹恶魔(2016)\n怒海沉尸\n暴饮暴食(1995)\n', '2022-10-15 14:27:55'),
(70, 4, 5, 'text', '， 你 就 得 逞 了 。', '2022-10-15 14:29:02'),
(71, 5, 1, 'text', '你好我想要恐怖片', '2022-10-15 14:31:26'),
(72, 5, 6, 'text', '[Recommend]:\n木乃伊（1999年斯蒂芬·索莫斯执导的电影）\n科学怪人（1910年的美国电影）\n伯爵夫人的耳环\n独行杀手\n旧日噩梦\n心理游戏（2004年汤浅政明执导日本动画电影）\n高潮\n杀人偶\n爱情万岁（周柏豪主演香港电影）\n蚁哥正传\n', '2022-10-15 14:32:07'),
(73, 5, 6, 'text', '。', '2022-10-15 14:32:47'),
(74, 5, 1, 'text', '我想要其他喜剧电影', '2022-10-15 14:37:31'),
(75, 5, 6, 'text', '[Recommend]:\n三个臭皮匠（帕特里克·华德执导电影）\n鬼妈妈（亨利·塞利克执导电影）\n心理游戏（2004年汤浅政明执导日本动画电影）\n来电惊魂\n伦巴（菲欧娜·戈登主演电影之一）\n战地情人\n死亡派对（2011年美国电影）\n大叔，我爱你\n火龙对决\n白色夹竹桃\n', '2022-10-15 14:38:05'),
(76, 5, 6, 'text', '。', '2022-10-15 14:38:38'),
(77, 5, 1, 'text', '有没有推荐的爱情电影', '2022-10-15 14:45:45'),
(78, 5, 6, 'text', '[Recommend]:\n鬼妈妈（亨利·塞利克执导电影）\n猎头游戏\n断背山（2005年李安执导美国电影）\n见鬼\n来电惊魂\n古镜怪谈\n三个臭皮匠（帕特里克·华德执导电影）\n年轻的亚当\n大白鲨（1978年美国吉诺特兹瓦克执导电影）\n我心狂野（1990年大卫·林奇执导美国电影）\n', '2022-10-15 14:46:26'),
(79, 5, 6, 'text', '。', '2022-10-15 14:47:05'),
(80, 6, 1, 'text', '我想要爱情电影', '2022-11-03 15:25:50'),
(81, 6, 10, 'text', '[Recommend]:\n婚姻生活（1970年弗朗索瓦·特吕弗导演电影）\n变形金刚（2007年派拉蒙影业真人版电影）\n加勒比海盗3：世界的尽头\n', '2022-11-03 15:26:17'),
(82, 6, 10, 'text', '来 了 ， 你 有 什 么 指 望 吗 ？', '2022-11-03 15:27:41'),
(83, 6, 1, 'text', '我想要爱情电影', '2022-11-03 15:31:21'),
(84, 6, 10, 'text', '[Recommend]:\n情书（1997年韩国电影）\n断背山（2005年李安执导美国电影）\n廊桥遗梦（美国1995年克林特·伊斯特伍德执导爱情电影）\n', '2022-11-03 15:31:49'),
(85, 6, 10, 'text', '[Response]:\n来 了 ， 你 有 什 么 指 望 吗 ？', '2022-11-03 15:33:15'),
(86, 6, 1, 'text', '我想要爱情电影', '2022-11-03 15:40:03'),
(87, 6, 10, 'text', '[Recommend]:\n云上的日子（1995年法国米开朗基罗·安东尼奥尼执导电影）\n断背山（2005年李安执导美国电影）\n血与蜜之地\n', '2022-11-03 15:40:32'),
(88, 6, 10, 'text', '[Response]:\n来 了 ， 你 有 什 么 指 望 吗 ？', '2022-11-03 15:41:57'),
(89, 6, 1, 'text', '我想要动作电影', '2022-11-03 15:44:01'),
(90, 6, 10, 'text', '[Recommend]:\n勇闯16街区\n', '2022-11-03 15:44:36'),
(91, 6, 10, 'text', '[Response]:\n来 了 ， 你 帮 我 一 起 看 呗 ， 我 正 在 想 怎 么 办 呢 ！', '2022-11-03 15:47:03'),
(92, 6, 1, 'text', '我想要爱情动作电影', '2022-11-03 16:18:29'),
(93, 6, 10, 'text', '[Recommend]:\n断背山（2005年李安执导美国电影）\n', '2022-11-03 16:19:03'),
(94, 6, 10, 'text', '[Response]:\n呢 ！', '2022-11-03 16:19:42'),
(95, 6, 1, 'text', '我想要动作电影', '2022-11-03 16:55:23'),
(96, 6, 10, 'text', '[Recommend]:\n通缉令（1984年金淑琪导演的电影）\n', '2022-11-03 16:55:58'),
(97, 6, 10, 'text', '[Response]:\n来 了 ， 你 帮 我 一 起 看 呗 ， 我 正 在 想 怎 么 办 呢 ！', '2022-11-03 16:58:23'),
(98, 6, 1, 'text', '你好我想要恐怖片', '2022-11-03 16:58:28'),
(99, 6, 10, 'text', '[Recommend]:\n木乃伊（1999年斯蒂芬·索莫斯执导的电影）\n', '2022-11-03 16:59:09'),
(100, 6, 10, 'text', '[Response]:\n的 照 片 ， 不 知 道 你 有 没 有 看 完 ， 我 很 想 要 。', '2022-11-03 17:01:37'),
(101, 6, 1, 'text', '有动作片推荐吗', '2022-11-03 17:02:08'),
(102, 6, 10, 'text', '[Recommend]:\n终结者2018\n', '2022-11-03 17:02:36'),
(103, 6, 10, 'text', '[Response]:\n？', '2022-11-03 17:03:02'),
(104, 6, 1, 'text', '我想要婚姻片', '2022-11-03 17:04:18'),
(105, 6, 10, 'text', '[Recommend]:\n杯酒人生\n', '2022-11-03 17:04:46'),
(106, 6, 10, 'text', '[Response]:\n！', '2022-11-03 17:05:13'),
(107, 6, 1, 'text', '我想要恐怖片', '2022-11-03 17:05:56'),
(108, 6, 10, 'text', '[Recommend]:\n剃头匠\n', '2022-11-03 17:06:31'),
(109, 6, 10, 'text', '[Response]:\n', '2022-11-03 17:07:05'),
(110, 6, 1, 'text', '我想要恐怖片', '2022-11-03 18:49:38'),
(111, 6, 10, 'text', '[Recommend]:\n木乃伊（1999年斯蒂芬·索莫斯执导的电影）\n', '2022-11-03 18:50:16'),
(112, 6, 10, 'recommend', '[Response]:\n帮 我 把 这 个 小 妹 妹 换 衣 服 ， 可 是 我 有 点 吃 不 消 。', '2022-11-03 18:53:03'),
(113, 6, 1, 'text', 'Sound Good', '2022-11-04 13:37:51'),
(114, 6, 1, 'text', '[Recommend]:\nA计划（中国1983年成龙执导的喜剧电影）\n', '2022-11-04 13:45:38'),
(115, 6, 1, 'recommend', '[Response]:\n忘 记 和 你 交 流 了 好 多 的 事 吗 ？', '2022-11-04 13:47:10'),
(116, 6, 1, 'text', '我想要恐怖片', '2022-11-04 13:48:54'),
(117, 6, 10, 'text', '[Recommend]:\n木乃伊（1999年斯蒂芬·索莫斯执导的电影）\n', '2022-11-04 13:50:21'),
(118, 6, 10, 'recommend', '[Response]:\n帮 我 把 这 个 小 妹 妹 换 衣 服 ， 可 是 我 有 点 吃 不 消 。', '2022-11-04 13:53:04'),
(119, 6, 1, 'text', 'I don\'t like it', '2022-11-04 13:53:09'),
(120, 6, 10, 'text', '[Recommend]:\n黑暗乡村\n', '2022-11-04 13:53:37'),
(121, 6, 10, 'recommend', '[Response]:\n淹 了 吧 哭 泣 一 个 我 的 大 猪 眼 ， 不 知 道 选 什 么 牌 子 。', '2022-11-04 13:56:20'),
(122, 6, 1, 'text', 'Sound Good', '2022-11-04 13:56:35'),
(123, 6, 10, 'text', '[Recommend]:\n死神来了2\n', '2022-11-04 13:56:49'),
(124, 6, 10, 'recommend', '[Response]:\n忘 记 丧 尸 了 吗 ？', '2022-11-04 13:57:44'),
(125, 6, 1, 'text', '忘记了', '2022-11-04 14:02:14'),
(126, 6, 10, 'text', '[Recommend]:\n隔山有眼2\n', '2022-11-04 14:02:29'),
(127, 6, 10, 'recommend', '[Response]:\n， 但 是 我 想 要 恐 怖 片 ！', '2022-11-04 14:03:36'),
(128, 6, 1, 'text', '我也想要恐怖片', '2022-11-04 14:04:46'),
(129, 6, 10, 'text', '[Recommend]:\nC 侦探\n', '2022-11-04 14:05:20'),
(130, 6, 10, 'recommend', '[Response]:\n。', '2022-11-04 14:05:54'),
(131, 6, 1, 'text', 'I don\'t like it', '2022-11-04 14:06:58'),
(132, 6, 10, 'text', '[Recommend]:\n鬼妈妈（亨利·塞利克执导电影）\n', '2022-11-04 14:07:27'),
(133, 6, 10, 'recommend', '[Response]:\n了 ， 但 是 没 看 够 ， 倒 是 有 点 吃 ， 有 点 吃 不 惯 。', '2022-11-04 14:09:40'),
(134, 6, 1, 'text', 'Sound Good', '2022-11-04 14:10:17'),
(135, 6, 10, 'text', '[Recommend]:\n小猪妈仔\n', '2022-11-04 14:10:32'),
(136, 6, 10, 'recommend', '[Response]:\n。', '2022-11-04 14:10:46'),
(137, 6, 1, 'text', 'I don\'t like it', '2022-11-04 14:10:49'),
(138, 6, 10, 'text', '[Recommend]:\n来电惊魂\n', '2022-11-04 14:11:18'),
(139, 6, 10, 'recommend', '[Response]:\n膜 膜 ！', '2022-11-04 14:11:59'),
(140, 6, 1, 'text', '我喜欢保罗·吉亚玛提的片', '2022-11-04 14:53:41'),
(141, 6, 10, 'text', '[Recommend]:\n第一夫人\n', '2022-11-04 14:54:18'),
(142, 6, 10, 'recommend', '[Response]:\n子 ， 我 喜 欢 金 匮 植 。', '2022-11-04 14:55:41'),
(143, 6, 1, 'text', 'Sound Good', '2022-11-04 15:14:21'),
(144, 6, 10, 'text', '[Recommend]:\n十月（1928年前苏联电影）\n', '2022-11-04 15:14:35'),
(145, 6, 10, 'recommend', '[Response]:\n。', '2022-11-04 15:14:49'),
(146, 6, 1, 'text', '我不喜欢', '2022-11-04 15:22:28'),
(147, 6, 10, 'text', '[Recommend]:\n湖边的少女\n', '2022-11-04 15:22:49'),
(148, 6, 10, 'recommend', '[Response]:\n违 花 薄 草 。', '2022-11-04 15:23:36'),
(149, 6, 1, 'text', '我喜欢', '2022-11-04 15:41:51'),
(150, 6, 10, 'text', '[Recommend]:\n看不见的客人\n', '2022-11-04 15:42:06'),
(151, 6, 10, 'recommend', '[Response]:\n金 · 纠 泽 。', '2022-11-04 15:42:40'),
(152, 7, 12, 'text', '你好', '2022-11-04 15:51:23'),
(153, 7, 13, 'text', '[Recommend]:\n幸福额度（2011年陈正道执导电影）\n', '2022-11-04 15:51:31'),
(154, 7, 13, 'recommend', '[Response]:\n徽 茵 衬 衫 裙 水 。', '2022-11-04 15:52:18'),
(155, 7, 12, 'text', '我喜欢', '2022-11-04 15:52:54'),
(156, 7, 13, 'text', '[Recommend]:\n三幕悲剧（1986年美国电视电影）\n', '2022-11-04 15:53:09'),
(157, 7, 13, 'recommend', '[Response]:\n违 花 羡 情 ， 我 喜 欢 ， 那 是 驱 捉 戛 然 开 朗 ~ 戛 然 开 朗 ~', '2022-11-04 15:55:29'),
(158, 6, 1, 'text', '我想要恐怖片', '2022-11-04 16:02:20'),
(159, 6, 10, 'text', '[Recommend]:\n布杜落水遇救记\n', '2022-11-04 16:02:54'),
(160, 6, 10, 'recommend', '[Response]:\n伤 害 你 好 點 意 思 ， 伐 嫌 弃 我 要 酋 旺 包 ， 你 太 不 可 能 酱 紫 了 。 你 要 是', '2022-11-04 16:06:17');

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
(2, 'SystemUser10173', 'SystemUser10173@crs.com', '123456'),
(3, 'SystemUser28509', 'SystemUser28509@crs.com', '123456'),
(4, 'SystemUser57717', 'SystemUser57717@crs.com', '123456'),
(5, 'SystemUser95106', 'SystemUser95106@crs.com', '123456'),
(6, 'SystemUser76284', 'SystemUser76284@crs.com', '123456'),
(7, 'ABC', 'abc@abc.com', '12345'),
(8, '1234', 'test123@test.com', '123456'),
(9, 'Test', 'test31@test.com', '123456'),
(10, 'SystemUser61005', 'SystemUser61005@crs.com', '123456'),
(11, 'test1', 'test1@test.com', '123456'),
(12, 'Test333', 'test3@test.com', '123456'),
(13, 'SystemUser50414', 'SystemUser50414@crs.com', '123456');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `input_queue`
--
ALTER TABLE `input_queue`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
