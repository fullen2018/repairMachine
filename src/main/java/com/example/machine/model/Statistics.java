package com.example.machine.model;

import lombok.Data;

/**
 * @version 1.0
 * @anthor on 2019/5/12
 * @since jdk8
 */
@Data
public class Statistics {

    /**
     * 机器编号
     */
    private Integer id;

    /**
     * 机器名字
     */
    private String name;

    /**
     * 维修次数
     */
    private Integer count;
}
