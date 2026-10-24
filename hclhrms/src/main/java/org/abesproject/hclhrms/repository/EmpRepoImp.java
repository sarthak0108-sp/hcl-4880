package org.abesproject.hclhrms.repository;

import org.abesproject.hclhrms.entity.Employee;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EmpRepoImp implements EmployeeRepo {
    List<Employee> emplist=new ArrayList<>();
    @Override
    public String addemp(Employee emp) {
        emplist.add(emp);
        return "Employee Added successfully";
    }

    @Override
    public List<Employee> getEmp() {
        return emplist;
    }

    @Override
    public Employee getEmpById(long empid) {
        return emplist.stream().filter(e->e.getEmp_id()==empid).findFirst().orElse(null);

    }
    @Override
    public String addEmployees(List<Employee>employees){
        emplist.addAll(employees);
        return employees.size() + " employees added successfully";
    }

    @Override
    public String deleteById(long empid) {
        boolean status=false;
        if(getEmpById(empid)!=null){
            status=emplist.removeIf(e->e.getEmp_id()==empid);
        }
        if(status){
            return "Employee added successfully";
        }
        return "Employee is not registered with id" + empid;
    }

    @Override
    public String updateById(long empid, Employee updatedEmp) {
        Employee existingEmp = getEmpById(empid);
        if (existingEmp == null) {
            return "Employee is not registered with id " + empid;
        }
        existingEmp.setEmp_name(updatedEmp.getEmp_name());
        existingEmp.setDesignation(updatedEmp.getDesignation());
        existingEmp.setProgStack(updatedEmp.getProgStack());
        existingEmp.setEmail(updatedEmp.getEmail());
        return "Employee updated successfully";
    }
}
