package org.abes.hrmsdatabase.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Employee {

    @Id
    @Column(name = "emp_id")
    private long empId;

    @Column(name = "emp_name")
    private String empName;

    private String stack;
    private String designation;

    // accepted in requests, never returned in responses
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    public Employee() {
    }

    public Employee(long empId, String empName, String stack, String designation) {
        this.empId = empId;
        this.empName = empName;
        this.stack = stack;
        this.designation = designation;
    }

    public long getEmpId() { return empId; }
    public void setEmpId(long empId) { this.empId = empId; }

    public String getEmpName() { return empName; }
    public void setEmpName(String empName) { this.empName = empName; }

    public String getStack() { return stack; }
    public void setStack(String stack) { this.stack = stack; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}