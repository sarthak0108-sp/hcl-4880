package org.abesproject.hclhrms;

import org.abesproject.hclhrms.entity.Employee;
import org.abesproject.hclhrms.repository.EmpRepoImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeServiceImp {
    @Autowired
    private EmpRepoImp emprepo;
    public String addEmp(){
        Employee emp1=new Employee(200,"Sarthak","Manager","Java","sarthakst0128@gmail.com");
        return emprepo.addemp(emp1);

    }
    public List<Employee> getEmp(){
        return emprepo.getEmp();
    }

    public Employee getEmpById(){
        return emprepo.getEmpById(200);
    }
public String addBulkEmployees(){
    List<Employee> employees = new ArrayList<>();
    employees.add(new Employee(201, "Aman", "Developer", "Java", "aman@gmail.com"));
    employees.add(new Employee(202, "Riya", "Tester", "Selenium", "riya@gmail.com"));
    employees.add(new Employee(203, "Karan", "Analyst", "SQL", "karan@gmail.com"));
    employees.add(new Employee(204, "Neha", "Developer", "Spring Boot", "neha@gmail.com"));

    int count = 0;
    for (Employee emp : employees) {
        emprepo.addemp(emp);
        count++;
    }
    return count + " employees added successfully";

}
public String deleteById(){
        long emp_id=201;
        return emprepo.deleteById(emp_id);
}
public String updateById(){
        long emp_id=202;
    Employee updated = new Employee(202, "Rohit Sharma", "Hacker", "Pull shot", "rohit.sharma@gmail.com");
    return emprepo.updateById(emp_id, updated);

}
}

