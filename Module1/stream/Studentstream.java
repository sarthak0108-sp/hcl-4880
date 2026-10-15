package stream;

import java.util.*;

class Student {
    String name;
    int age;
    int rollno;
    Student(String name,int age,int rollno){
        this.name=name;
        this.age=age;
        this.rollno=rollno;
    }

}
public class Studentstream {
    public static void main(String[] args){
        ArrayList<Student>stu=new ArrayList<>();
        stu.add(new Student("Sarthak",21,226));
        stu.add(new Student("Aastha",19,223));
        stu.add(new Student("Sanskar",12,220));



    }

}
