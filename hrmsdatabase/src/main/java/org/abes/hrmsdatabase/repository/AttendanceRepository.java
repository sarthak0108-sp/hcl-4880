package org.abes.hrmsdatabase.repository;

import org.abes.hrmsdatabase.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    boolean existsByEmployee_EmpIdAndAttendancedate(Long empId, LocalDate date);

    Optional<Attendance> findByEmployee_EmpIdAndAttendancedate(Long empId, LocalDate date);

    List<Attendance> findByEmployee_EmpIdOrderByAttendancedateDesc(Long empId);
}