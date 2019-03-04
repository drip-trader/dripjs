# ************************************************************
# Sequel Pro SQL dump
# バージョン 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# ホスト: 127.0.0.1 (MySQL 5.7.23)
# データベース: test
# 作成時刻: 2019-03-04 17:36:15 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# テーブルのダンプ master_pair
# ------------------------------------------------------------

CREATE TABLE `master_pair` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'primary auto generated id',
  `name` varchar(32) NOT NULL COMMENT 'special pair name',
  `exchange` varchar(32) NOT NULL COMMENT 'exchange name of special pair',
  `base_asset` varchar(10) NOT NULL COMMENT 'base asset name',
  `quote_asset` varchar(10) NOT NULL COMMENT 'quote asset name',
  `price_precision` int(10) unsigned NOT NULL COMMENT 'pair price precision',
  `amount_precision` int(10) unsigned NOT NULL COMMENT 'pair amount precision',
  `min_order_amount` decimal(9,9) unsigned NOT NULL DEFAULT '0.000000000' COMMENT 'min Order amount',
  `max_order_amount` int(10) unsigned NOT NULL COMMENT 'max Order amount',
  `min_order_price` decimal(9,9) unsigned NOT NULL DEFAULT '0.000000000' COMMENT 'min Order price',
  `max_order_price` int(10) unsigned NOT NULL COMMENT 'max Order price',
  `is_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT 'whether pair is enable status',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_base_asset_quote_asset` (`base_asset`,`quote_asset`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
