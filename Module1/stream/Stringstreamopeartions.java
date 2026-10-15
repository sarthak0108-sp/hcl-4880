package stream;

import java.util.ArrayList;
import java.util.Arrays;

public class Stringstreamopeartions {
    public static void main(String[] args){
        ArrayList <String> s=new ArrayList<>(Arrays.asList("Sarthak","Sanskar", "Shivam", "Stuart",
                "Satwik", "Sachin", "Sonal"));
        System.out.println(s);
        s.stream()
                .filter(name -> name.startsWith("S"))
                .forEach(System.out::println);
        s.stream()
                .filter(name -> name.startsWith("t"))
                .forEach(System.out::println);
        s.stream()
                .map(String::toUpperCase)
                .forEach(System.out::println);
        s.stream()
                .map(name->"Mr."+ name)
                .forEach(System.out::println);

    }
}
