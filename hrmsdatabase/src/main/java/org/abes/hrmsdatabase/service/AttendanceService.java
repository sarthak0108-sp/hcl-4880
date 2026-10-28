package org.abes.hrmsdatabase.service;

import org.abes.hrmsdatabase.model.Attendance;
import org.abes.hrmsdatabase.repository.AttendanceRepository;
import org.abes.hrmsdatabase.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public String markAttendance(Attendance attendance) {
        if (attendance.getEmployee() == null) {
            return "Attendance not marked: Employee information missing";
        }

        long empId = attendance.getEmployee().getEmpId();

        if (!employeeRepository.existsById(empId)) {
            return "Attendance not marked: Employee does not exist";
        }

        LocalDate today = LocalDate.now();

        if (attendanceRepository.existsByEmployee_EmpIdAndAttendancedate(empId, today)) {
            return "Attendance already marked for today";
        }

        attendance.setAttendancedate(today);
        attendanceRepository.save(attendance);
        return "Attendance Marked Successfully";
    }

    public String markOut(long empId, LocalDateTime outTime) {
        Attendance a = attendanceRepository
                .findByEmployee_EmpIdAndAttendancedate(empId, LocalDate.now())
                .orElse(null);

        if (a == null) {
            return "No attendance found for today";
        }
        if (a.getOutTime() != null) {
            return "Out time already marked";
        }

        a.setOutTime(outTime);
        attendanceRepository.save(a);
        return "Out time marked successfully";
    }

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    public List<Attendance> getByEmployee(long empId) {
        return attendanceRepository.findByEmployee_EmpIdOrderByAttendancedateDesc(empId);
    }
}