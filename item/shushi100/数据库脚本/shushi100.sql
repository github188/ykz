/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : shushi100

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2017-06-30 16:35:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('3', '', '', '');
INSERT INTO `users` VALUES ('4', '13533333333', '', '');
INSERT INTO `users` VALUES ('5', '13534111111', '123456', '123456');
INSERT INTO `users` VALUES ('6', '13534111112', '123456', '123456');
INSERT INTO `users` VALUES ('7', '13544444444', '123456', '123456');
INSERT INTO `users` VALUES ('8', '13455555555', '123456', '123456');
INSERT INTO `users` VALUES ('9', '13522222222', '', '');
INSERT INTO `users` VALUES ('10', '13545444444', '123456', '123456');
INSERT INTO `users` VALUES ('11', '13545444445', '123456', '123456');
INSERT INTO `users` VALUES ('12', '13545444111', '123456', '123456');
INSERT INTO `users` VALUES ('13', '13545444112', '123456', '123456');
INSERT INTO `users` VALUES ('14', '13545444113', '123456', '123456');
INSERT INTO `users` VALUES ('15', '13545444114', '123456', '123456');
INSERT INTO `users` VALUES ('16', '13622221552', '123456', '123456');
INSERT INTO `users` VALUES ('17', '13554568452', '123456', '123456');
INSERT INTO `users` VALUES ('18', '13415555555', '123456', '123456');
INSERT INTO `users` VALUES ('19', '13534318319', '123456', '123456');
