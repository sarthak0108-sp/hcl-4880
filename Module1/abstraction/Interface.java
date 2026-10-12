package abstraction;

interface A{
    void m1();
    static void m2(){
        System.out.println("Static method");
    }
}
class B implements A{
    public void m1(){
        System.out.println("Hello");
    }
}
public class Interface {
    public static void main(String[] args){
        A a=new B();
        a.m1();
        A.m2();
    }
}
