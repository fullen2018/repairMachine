package com.example.machine.dao.mapper;


import com.example.machine.dao.mapper.base.BaseMapper;
import com.example.machine.model.StaffModel;
import com.example.machine.model.Token;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 职工接口
 */
public interface StaffMapper extends BaseMapper<StaffModel> {

    /**
     * 登录接口
     * @param email
     * @param password
     * @param role
     * @return
     */
    Token login(@Param("email") String email,@Param("password") String password,@Param("role") Integer role);

    /**
     * 重置密码接口
     * @param password
     * @param id
     * @return
     */
    Integer restPW(@Param("password") String password,@Param("id") Integer id);

    /**
     * 获取所有的机修员
     * @return
     */
    List<StaffModel> listMaintainer();

    /**
     *添加职工查重邮箱
     */
    Integer validateEmail(@Param("email") String email);


    /**
     * 修改职工查重邮箱
     * @param email
     * @return
     */
    Integer validateEmailEdit(@Param("email") String email,@Param("id") Integer id);


}