package com.example.machine.dao.mapper;

import com.example.machine.dao.mapper.base.BaseMapper;
import com.example.machine.model.MachineModel;
import com.example.machine.model.Statistics;

import java.util.List;

public interface MachineMapper extends BaseMapper<MachineModel> {

    /**
     * 获取所有的机器编号
     * @return
     */
    List<Integer> getAllMachine();

}