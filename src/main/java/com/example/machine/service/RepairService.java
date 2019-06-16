package com.example.machine.service;

import com.example.machine.controller.vo.LimitVO;
import com.example.machine.dao.mapper.MachineMapper;
import com.example.machine.dao.mapper.RepairMapper;
import com.example.machine.model.MachineModel;
import com.example.machine.model.RepairModel;
import com.example.machine.model.Statistics;
import com.example.machine.service.baseService.BaseService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @anthor on 2019/5/11
 * @since jdk8
 *
 * 维修单服务类
 */
@Service
public class RepairService extends BaseService<RepairModel> {

    @Resource
    MachineMapper machineMapper;

    @Resource
    RepairMapper repairMapper;

    /**
     * 添加订单服务层
     * @param r
     * @return
     * @throws Exception
     */
    @Override
    public Integer add(RepairModel r) throws Exception {
        // 获取所有机器的id
        List<Integer> allMachine = machineMapper.getAllMachine();
        if(!allMachine.contains(r.getMachineId())){
            return -1;
        }
        getInvokeObjName();
        return (Integer) reflectEngine.invokeMapperMethod("insertSelective", invokeObjName, new Class[]{Object.class}, r);
    }

    /**
     * 维修统计
     * @return
     */
    public Map<String,Object> statistics(LimitVO limitVO){
        Map<String,Object> resultMap = new HashMap<>();

        // 获取所有机器的id
        List<Integer> allMachine = machineMapper.getAllMachine();
        resultMap.put("amount",allMachine.size());
        // 获取已有的统计
        List<Statistics> statisticsList = repairMapper.statistics();

        /*寻找没有维修过的机器*/
        for (Statistics s:
             statisticsList) {
            if(allMachine.contains(s.getId())){
                allMachine.remove(s.getId());
            }
        }

        /*没有维修过的机器加入到展示集合中去*/
        for (Integer m:
             allMachine) {
            MachineModel machineModel = machineMapper.selectByPrimaryKey(m);
            Statistics statistics = new Statistics();
            statistics.setId(m);
            statistics.setName(machineModel.getMachineName());
            statistics.setCount(0);
            statisticsList.add(statistics);
        }

        List<Statistics> selectList = new ArrayList<>();
        for(int i = limitVO.getStartIndex(); i < Math.min(limitVO.getStartIndex()+limitVO.getLimit(),statisticsList.size()); i++){
            selectList.add(statisticsList.get(i));
        }
        resultMap.put("list",selectList);
        return resultMap;
    }

    /**
     * 更新数据库中某个对象的相应字段
     *
     * @param repairModel 需要更新的对象
     * @return
     * @throws Exception 修改失败抛出异常
     */
    @Override
    public Integer update(RepairModel repairModel) throws Exception {
        System.out.println("service:"+repairModel.toString());
        getInvokeObjName();
        return (Integer) reflectEngine.invokeMapperMethod("updateByPrimaryKeySelective", invokeObjName, new Class[]{Object.class}, repairModel);
    }

    private void sendEmail(RepairModel repairModel){

//        RepairModel
//
//        switch (repairModel.getRepairStatus()){
//            case 2:
//
//                break;
//            case 3:
//                break;
//        }
    }


}
