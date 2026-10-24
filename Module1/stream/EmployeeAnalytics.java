package stream;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.*;

//import static sun.awt.image.MultiResolutionCachedImage.map;

public class EmployeeAnalytics {
    record Employee(int id, String name, String dept, BigDecimal salary,
                    LocalDate hireDate, Set<String> skills) {}

    static Employee e(int id, String n, String d, int sal, String date, String... skills) {
        return new Employee(id, n, d, BigDecimal.valueOf(sal),
                LocalDate.parse(date), Set.of(skills));
    }

    public static void main(String[] args) {
        List<Employee> emps = List.of(
                e(1, "Asha",   "Engineering",  90000, "2019-03-01", "Java", "SQL"),
                e(2, "Ravi",   "Engineering", 120000, "2016-07-15", "Java", "Spring", "AWS"),
                e(3, "Meera",  "HR",           60000, "2020-01-10", "Recruiting"),
                e(4, "John",   "Sales",        70000, "2018-11-20", "Negotiation", "CRM"),
                e(5, "Priya",  "Engineering", 105000, "2021-05-05", "Java", "React"),
                e(6, "Karan",  "Sales",        65000, "2022-02-14", "CRM"),
                e(7, "Sara",   "HR",           62000, "2017-09-09", "Recruiting", "Payroll"),
                e(8, "Vikram", "Finance",      80000, "2015-04-30", "Excel", "SQL"));
        // Solve Q1 to Q12 below
        //  Q1----------------------
        List<String> result = emps.stream()
                .filter(e -> e.dept().equals("Engineering"))
                .sorted(Comparator.comparing(Employee::salary).reversed())
                .map(Employee::name)
                .toList();
        System.out.println(result);

        //  Q2----------------------
        List<String>result2=emps.stream()
                .sorted(Comparator.comparing(Employee::salary).reversed())
                .limit(3)
                .map(Employee::name)
                .toList();
        System.out.println(result2);

        //  Q3----------------------
        List<String>result3=emps.stream()
                .filter(e->e.hireDate().isBefore(LocalDate.of(2018, 1, 1)))
                .sorted(Comparator.comparing(Employee::hireDate))
                .map(e->e.name()+"("+e.hireDate().getYear()+")")
                .toList();
        System.out.println(result3);
    }
}