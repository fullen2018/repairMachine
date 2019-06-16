package com.example.machine.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class StaffModel implements Serializable {
    private Integer staffId;

    private String staffEmail;

    private String staffName;

    private String staffPassword;

    private Integer staffRole;

    private static final long serialVersionUID = 1L;

}