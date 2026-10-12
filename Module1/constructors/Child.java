package constructors;

public class Child extends Constructordemo {
    int x=20;
    void show(){
        System.out.println("Child Method");
    }
    void display(){
        System.out.println(this.x);
        System.out.println(super.x);
        this.show();
        super.show();
     }
    public static void main(String[] args){
        Child obj=new Child();
        obj.display();
    }
}
