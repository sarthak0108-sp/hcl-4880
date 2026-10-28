package org.abes.hrmsdatabase.controller;

import org.abes.hrmsdatabase.model.Attendance;
import org.abes.hrmsdatabase.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RequestMapping("/v1/user/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/markattendance")
    public String markAttendance(@RequestBody Attendance attendance) {
        return attendanceService.markAttendance(attendance);
    }

    @PutMapping("/markout")
    public String markOut(@RequestParam long empid, @RequestParam String outTime) {
        return attendanceService.markOut(empid, LocalDateTime.parse(outTime));
    }

    @GetMapping("/all")
    public List<Attendance> getAll() {
        return attendanceService.getAllAttendance();
    }

    @GetMapping("/employee/{empid}")
    public List<Attendance> getByEmployee(@PathVariable long empid) {
        return attendanceService.getByEmployee(empid);
    }
}