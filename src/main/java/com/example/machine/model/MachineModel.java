package com.example.machine.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class MachineModel implements Serializable {
    private Integer machineId;

    private String machineName;

    private String machineMsg;

    private static final long serialVersionUID = 1L;

}