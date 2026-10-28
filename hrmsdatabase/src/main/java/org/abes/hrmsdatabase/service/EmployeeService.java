package org.abes.hrmsdatabase.service;

import org.abes.hrmsdatabase.model.Employee;
import org.abes.hrmsdatabase.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String createnewEmployee(Employee emp) {
        if (employeeRepository.existsById(emp.getEmpId())) {
            return "Employee ID already exists: " + emp.getEmpId();
        }
        if (emp.getPassword() == null || emp.getPassword().isBlank()) {
            return "Password is required";
        }

        emp.setPassword(passwordEncoder.encode(emp.getPassword()));
        employeeRepository.save(emp);
        return "Employee is added successfully";
    }

    public boolean login(long empid, String password) {
        Employee emp = employeeRepository.findById(empid).orElse(null);
        return emp != null
                && emp.getPassword() != null
                && passwordEncoder.matches(password, emp.getPassword());
    }

    public Employee getEmployeeById(long empid) {
        return employeeRepository.findById(empid).orElse(null);
    }

    public String deleteEmployeeById(long empid) {
        if (employeeRepository.existsById(empid)) {
            employeeRepository.deleteById(empid);
            return "Employee deleted successfully";
        }
        return "Employee is not registered with id " + empid;
    }

    public String updateEmployeeById(long empid, Employee updatedEmp) {
        Employee existingEmp = employeeRepository.findById(empid).orElse(null);
        if (existingEmp == null) {
            return "Employee is not registered with id " + empid;
        }
        existingEmp.setEmpName(updatedEmp.getEmpName());
        existingEmp.setStack(updatedEmp.getStack());
        existingEmp.setDesignation(updatedEmp.getDesignation());
        employeeRepository.save(existingEmp);
        return "Employee updated successfully";
    }
}