package org.abes.hrmsdatabase.controller;

import jakarta.servlet.http.HttpSession;
import org.abes.hrmsdatabase.model.Employee;
import org.abes.hrmsdatabase.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RequestMapping("/v1/user")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/")
    public String msg() {
        return "Welcome to SpringBoot App development";
    }

    @PostMapping("/addemp")
    public String addnewEmployee(@RequestBody Employee emp) {
        return employeeService.createnewEmployee(emp);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam("empid") long empid,
                                        @RequestParam("password") String password,
                                        HttpSession session) {
        if (employeeService.login(empid, password)) {
            session.setAttribute("empid", empid);
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid employee ID or password");
    }

    @GetMapping("/findbyid/{empid}")
    public Employee getEmpById(@PathVariable long empid) {
        return employeeService.getEmployeeById(empid);
    }

    @DeleteMapping("/deletebyid/{empid}")
    public String deleteById(@PathVariable long empid) {
        return employeeService.deleteEmployeeById(empid);
    }

    @PutMapping("/updatebyid/{empid}")
    public String updateById(@PathVariable long empid, @RequestBody Employee emp) {
        return employeeService.updateEmployeeById(empid, emp);
    }
}