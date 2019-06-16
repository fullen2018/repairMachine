package com.example.machine.dao.mapper;

import com.example.machine.dao.mapper.base.BaseMapper;
import com.example.machine.model.RepairModel;
import com.example.machine.model.Statistics;

import java.util.List;

public interface RepairMapper extends BaseMapper<RepairModel> {
    /**
     * 维修统计
     * @return
     */
    List<Statistics> statistics();

}