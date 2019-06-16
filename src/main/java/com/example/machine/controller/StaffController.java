package com.example.machine.controller;

import com.example.machine.controller.baseController.BaseController;
import com.example.machine.controller.dto.RespondsMessage;
import com.example.machine.model.StaffModel;
import com.example.machine.service.StaffService;
import com.example.machine.utils.LogUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * @version 1.0
 * @anthor on 2019/5/11
 * @since jdk8
 *
 * 员工外部访问接口
 */
@RestController
@RequestMapping("staff")
@Slf4j
public class StaffController  extends BaseController<StaffModel> {


     @Autowired
     StaffService staffService;


    /**
     * 获取所有的机修员
     *
     * @return
     */
    @RequestMapping(value = "maintainers", method = RequestMethod.GET)
    @ResponseBody
    public RespondsMessage listMaintainer() {
          List<StaffModel> list = staffService.listMaintainer();

          System.out.println( list.get(0).toString());
         RespondsMessage respondsMessage = RespondsMessage.success(LogUtil.logInfo(log, "获取数据列表执行成功"), list);
         System.out.println("retrue:"+respondsMessage.toString());

          return respondsMessage;

    }

    /**
     * 添加一条数据
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "add", method = RequestMethod.POST)
    @ResponseBody
    @Override
    public RespondsMessage add(@ModelAttribute StaffModel model) {
        System.out.println(model.toString());
        getInvokeObjName();
        Integer status = 0;
        try {
            status = (Integer) reflectEngine.invokeMapperMethod("add", invokeObjName, new Class[]{Object.class}, model);
            if(status == -1){
                return RespondsMessage.failure(LogUtil.logInfo(log, "注册失败，该邮箱已经被注册"), status);
            }
            return RespondsMessage.success(LogUtil.logInfo(log, "执行成功"), status);
        } catch (Exception e) {
            return RespondsMessage.failure(LogUtil.logInfo(log, "执行失败"), status);
        }
    }

    /**
     * 更新一条数据
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "update", method = RequestMethod.PUT)
    @ResponseBody
    @Override
    public RespondsMessage update(@ModelAttribute StaffModel model) {
        System.out.println("controller:"+model.toString());
        getInvokeObjName();
        Integer status = 0;
        try {
            status = (Integer) reflectEngine.invokeMapperMethod("update", invokeObjName, new Class[]{Object.class}, model);
            if(status == -1){
                return RespondsMessage.failure(LogUtil.logInfo(log, "修改失败，该邮箱已经被使用"), status);
            }
            return RespondsMessage.success(LogUtil.logInfo(log, "执行成功"), status);
        } catch (Exception e) {
            return RespondsMessage.failure(LogUtil.logInfo(log, "执行失败"), status);
        }
    }





}
