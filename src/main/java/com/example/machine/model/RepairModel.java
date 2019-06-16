package com.example.machine.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class RepairModel implements Serializable {

    /**
     * 单号
     */
    private Integer repairId;

    /**
     *操作员
     */
    private Integer staffOperId;

    /**
     * 操作员姓名
     */
    private String staffOperName;

    /**
     * 机器编号
     */
    private Integer machineId;

    /**
     * 维修的机器
     */
    private MachineModel machine;

    /**
     * 出现故障时间
     */
    private String repairTime;

    /**
     * 故障描述
     */
    private String repairDescrp;

    /**
     * 故障原因
     */
    private String repairCause;

    /**
     * 维修使用到的部件
     */
    private String repairPart;

    /**
     * 是否修复
     * 0代表不需要重新维修
     * 1代表未修复需要重新维修
     */
    private Integer repairDeal;

    /**
     * 维修单状态
     * 0代表分派中
     * 1代表维修中
     * 2代表确认中
     * 3代表完成维修
     */
    private Integer repairStatus;

    /**
     * 维修人id
     */
    private Integer staffRepairId;

    /**
     * 维修员姓名
     */
    private String staffRepairName;



    private static final long serialVersionUID = 1L;

}