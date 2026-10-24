package Springdemo;

public class Main {
    public static void main(String[] args){
        System.out.println("Hello and Welcome");
        Singleemployee obj1=Singleemployee.makeInstance();
        Singleemployee obj2=Singleemployee.makeInstance();
        String msg=obj1.getMsg();
        System.out.println(msg);
        System.out.println(obj1.hashCode());
        System.out.println(obj2.hashCode());
    }
}
