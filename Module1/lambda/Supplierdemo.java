package lambda;
import java.util.function.Supplier;
public class Supplierdemo {
    public static void main(String[] args){
        Supplier<String>s=()->"Hello";
        System.out.println(s.get());
        Supplier<Integer>num=()->100;
        System.out.println(num.get());
    }
}
