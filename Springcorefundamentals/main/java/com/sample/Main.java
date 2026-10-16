package com.sample;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {
    public static void main(String[] args){
        ApplicationContext ctx=new AnnotationConfigApplicationContext(AppConfig.class);
        Employee emp1=ctx.getBean(Employee.class);
        Employee emp2=ctx.getBean(Employee.class);
        System.out.println(emp1.hashCode());
        emp1.display();
        System.out.println(emp2.hashCode());
        emp2.display();
    }
}
