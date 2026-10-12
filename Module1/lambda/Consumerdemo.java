package lambda;
import java.util.function.Consumer;

public class Consumerdemo {
    public static void main(String[] args){
        Consumer<String>c=name->System.out.println("Hello"+" "+name);
        c.accept("Shashank");
        c.accept("Sumit");
    }
}
