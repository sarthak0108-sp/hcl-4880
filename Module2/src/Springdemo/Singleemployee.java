package Springdemo;

public class Singleemployee {
    static final Singleemployee obj=new Singleemployee();
    private Singleemployee(){

    }
    public void display() {
        System.out.println("Singleton object created");
    }
    public static Singleemployee makeInstance(){
        return obj;
    }
    public String getMsg(){
        return "I am using Java";
    }
}
