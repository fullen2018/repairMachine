package com.example.machine.service.baseService;


import com.example.machine.dao.mapper.StaffMapper;
import com.example.machine.model.Token;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @version 1.0
 * @anthor on 2019/5/7
 * @since jdk8
 *
 * 登录服务层
 */
@Service
public class BaseLoginService {

    @Resource
    StaffMapper staffMapper;

    /**
     * 操作员、维修员、管理员登录接口
     * @param email
     * @param password
     * @param roleType
     * @return
     */
    public Token login(String email, String password, Integer roleType){
        Token token = staffMapper.login(email,password,roleType);

        return token;
    }

    /**
     * 操作员、维修员、管理员更改密码
     * @param password
     * @param id
     * @return
     */
    public Integer resetPassword(String password, Integer id){
        Integer status = staffMapper.restPW(password,id);
        return status;
    }
}
