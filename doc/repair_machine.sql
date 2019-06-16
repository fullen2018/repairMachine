/*
Navicat MySQL Data Transfer

Source Server         : zhangsenlin
Source Server Version : 50710
Source Host           : localhost:3306
Source Database       : repair_machine

Target Server Type    : MYSQL
Target Server Version : 50710
File Encoding         : 65001

Date: 2019-05-12 12:18:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for machine
-- ----------------------------
DROP TABLE IF EXISTS `machine`;
CREATE TABLE `machine` (
  `machine_id` int(11) NOT NULL AUTO_INCREMENT,
  `machine_name` varchar(20) NOT NULL,
  `machine_msg` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`machine_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of machine
-- ----------------------------
INSERT INTO `machine` VALUES ('1', '打印机', '1教学楼大厅');
INSERT INTO `machine` VALUES ('2', '打印机', '2教学楼大厅');
INSERT INTO `machine` VALUES ('3', '打印机', '3教学楼大厅');
INSERT INTO `machine` VALUES ('4', '打印机', '4教学楼大厅');
INSERT INTO `machine` VALUES ('5', '洗衣机', '1号宿舍楼洗衣机间');
INSERT INTO `machine` VALUES ('6', '洗衣机', '2号宿舍楼洗衣机间');
INSERT INTO `machine` VALUES ('7', '洗衣机', '3号宿舍楼洗衣机间');
INSERT INTO `machine` VALUES ('8', '货物扫描仪', '佳美超市');
INSERT INTO `machine` VALUES ('9', '货物扫描仪', '佳美超市');
INSERT INTO `machine` VALUES ('10', '货物扫描仪', '乐乐超市');

-- ----------------------------
-- Table structure for repair
-- ----------------------------
DROP TABLE IF EXISTS `repair`;
CREATE TABLE `repair` (
  `repair_id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_oper_id` int(11) NOT NULL COMMENT '操作员',
  `machine_id` int(11) DEFAULT NULL,
  `repair_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `repair_descrp` varchar(500) NOT NULL COMMENT '故障描述',
  `repair_cause` varchar(500) DEFAULT NULL COMMENT '故障原因',
  `repair_part` varchar(500) DEFAULT NULL COMMENT '使用到的零件',
  `repair_deal` int(11) NOT NULL DEFAULT '0' COMMENT '是否需要复修，当值为1时进入复修状态',
  `repair_status` int(11) NOT NULL DEFAULT '0' COMMENT '0代表未指派，1代表维修中，2代表维修完成，3代表修复成功',
  `staff_repair_id` int(11) DEFAULT NULL COMMENT '维修员',
  PRIMARY KEY (`repair_id`),
  KEY `FK_Relationship_2` (`machine_id`),
  CONSTRAINT `FK_Relationship_2` FOREIGN KEY (`machine_id`) REFERENCES `machine` (`machine_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of repair
-- ----------------------------
INSERT INTO `repair` VALUES ('2', '1472354', '2', '2019-05-12 00:16:42', 'dsadasd', '莫名其妙就好了', null, '0', '4', '1472355');
INSERT INTO `repair` VALUES ('3', '1472354', '3', '2019-05-12 11:39:24', '测试', 'hhhh', 'hhhh', '0', '4', '1472355');
INSERT INTO `repair` VALUES ('4', '1472359', '5', '2019-05-12 11:33:26', '测试110111', null, null, '0', '2', '1472358');
INSERT INTO `repair` VALUES ('5', '1472359', '3', '2019-05-12 11:38:30', '测试1111111', 'eeee', 'eeee', '0', '4', '1472355');
INSERT INTO `repair` VALUES ('6', '1472354', '8', '2019-05-12 12:00:37', '测试0000000', '巴拉巴拉', '巴拉巴拉', '0', '4', '1472355');

-- ----------------------------
-- Table structure for staff
-- ----------------------------
DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_email` varchar(20) NOT NULL,
  `staff_name` varchar(10) NOT NULL,
  `staff_password` varchar(20) NOT NULL,
  `staff_role` int(11) NOT NULL COMMENT '1代表操作员。2代表维修员。3代表管理员',
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1472361 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of staff
-- ----------------------------
INSERT INTO `staff` VALUES ('1472354', '1318699937@qq.com', '张学友', '12345', '1');
INSERT INTO `staff` VALUES ('1472355', '1318699937@qq.com', '张飞', '123456', '2');
INSERT INTO `staff` VALUES ('1472356', '1318699937@qq.com', '刘德华', '123456', '3');
INSERT INTO `staff` VALUES ('1472358', '11136@163.com', '员工1121', '123', '2');
INSERT INTO `staff` VALUES ('1472359', '11111254@163.com', '测试22200', '123456', '1');
INSERT INTO `staff` VALUES ('1472360', '441@163.com', '测试员', '123456', '1');
