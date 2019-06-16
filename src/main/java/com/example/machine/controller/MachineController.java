package com.example.machine.controller;

import com.example.machine.controller.baseController.BaseController;
import com.example.machine.model.MachineModel;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @version 1.0
 * @anthor on 2019/5/11
 * @since jdk8
 *
 * 机器外部访问接口
 */
@RestController
@RequestMapping("/machine")
public class MachineController extends BaseController<MachineModel> {
}
