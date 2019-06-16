package com.example.machine.service;

import com.example.machine.dao.mapper.StaffMapper;
import com.example.machine.model.StaffModel;
import com.example.machine.service.baseService.BaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @version 1.0
 * @anthor on 2019/5/11
 * @since jdk8
 *
 * 职工服务类
 */
@Service
public class StaffService extends BaseService<StaffModel> {

    @Resource
    StaffMapper staffMapper;

    /**
     * 获取所有的机修员
     * @return
     */
     public List<StaffModel>  listMaintainer(){
          return staffMapper.listMaintainer();
    }

    /**
     * 添加一条记录
     *
     * @param staffModel
     * @throws Exception
     */
    @Override
    public Integer add(StaffModel staffModel) throws Exception {
        if(staffMapper.validateEmail(staffModel.getStaffEmail()) != 0){
            return -1;
        }
        getInvokeObjName();
        return (Integer) reflectEngine.invokeMapperMethod("insertSelective", invokeObjName, new Class[]{Object.class}, staffModel);
    }

    /**
     * 更新数据库中某个对象的相应字段
     *
     * @param s 需要更新的对象
     * @return
     * @throws Exception 修改失败抛出异常
     */
    @Override
    public Integer update(StaffModel s) throws Exception {
        System.out.println("service:"+s.toString());
        if(staffMapper.validateEmailEdit(s.getStaffEmail(),s.getStaffId()) != 0){
            return -1;
        }
        getInvokeObjName();
        return (Integer) reflectEngine.invokeMapperMethod("updateByPrimaryKeySelective", invokeObjName, new Class[]{Object.class}, s);
    }
}
