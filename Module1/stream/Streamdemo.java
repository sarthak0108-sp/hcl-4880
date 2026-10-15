package stream;

import java.util.ArrayList;
import java.util.stream.Collectors;

public class Streamdemo {
    public static void main(String[] args){
        ArrayList<Integer>a=new ArrayList<>();
       // ArrayList<String>s=new ArrayList<>();
        a.add(10);
        a.add(20);
        a.add(30);
        a.add(40);
        System.out.println(a);
        a.stream().filter(n->n%2==0).forEach(System.out::println);
        a.stream().map(n->n*2).forEach(System.out::println);
        a.stream().distinct().forEach(System.out::println);
        ArrayList<Integer>result=a.stream().collect(Collectors.toCollection(ArrayList::new));
        System.out.println("Collected List: " + result);
    }
}
