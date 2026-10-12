package lambda;

import java.util.function.Predicate;

public class Predicatedemo {
    public static void main(String[] args){
        Predicate<Integer>p=n->n>10;
        System.out.println(p.test(20));
        System.out.println(p.test(5));


    }
}
