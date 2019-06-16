package com.example.machine.controller;

import com.example.machine.controller.baseController.BaseController;
import com.example.machine.controller.dto.RespondsMessage;
import com.example.machine.controller.vo.LimitVO;
import com.example.machine.model.RepairModel;
import com.example.machine.model.Statistics;
import com.example.machine.service.RepairService;
import com.example.machine.utils.LogUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @anthor on 2019/5/11
 * @since jdk8
 *
 * 维修单外部访问接口
 */
@RestController
@RequestMapping("/repair")
@Slf4j
public class RepairController extends BaseController<RepairModel> {


    @Autowired
    RepairService repairService;


    /**
     * 添加一条数据
     *
     * @param model
     * @return
     */
    @Override
    @RequestMapping(value = "add", method = RequestMethod.POST)
    @ResponseBody
    public RespondsMessage add(@ModelAttribute RepairModel model) {
        System.out.println(model.toString());
        getInvokeObjName();
        Integer status = 0;
        try {
            status = (Integer) reflectEngine.invokeMapperMethod("add", invokeObjName, new Class[]{RepairModel.class}, model);
            switch (status){
                case -1:
                    return RespondsMessage.failure(LogUtil.logInfo(log, "没有找到相应的机器"), status);
                case  0:
                    return RespondsMessage.failure(LogUtil.logInfo(log, "添加数据失败"), status);
                case  1:
                    return RespondsMessage.success(LogUtil.logInfo(log, "添加一条数据执行成功"), status);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return RespondsMessage.failure(LogUtil.logInfo(log, "添加一条数据执行失败"), status);

        }
        return null;
    }

    /**
     * 获取机器维修的统计
     * @return
     */
    @RequestMapping(value = "statistics", method = RequestMethod.GET)
    public  RespondsMessage statistics(@ModelAttribute LimitVO limitVO){
        Map<String,Object> map = repairService.statistics(limitVO);
        return RespondsMessage.success(LogUtil.logInfo(log, "获取数据成功"), map.get("list"),map.get("amount"));
    }

}
