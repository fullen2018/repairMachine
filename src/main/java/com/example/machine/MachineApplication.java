package com.example.machine;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@MapperScan("com.example.machine.dao.mapper")
@ComponentScan(basePackages = { "com.example.machine.component"
                                 ,"com.example.machine.service"
                                 ,"com.example.machine.controller"
                                 ,"com.example.machine.config"})
@EnableTransactionManagement
public class MachineApplication {

    public static void main(String[] args) {
        SpringApplication.run(MachineApplication.class, args);
    }

}
