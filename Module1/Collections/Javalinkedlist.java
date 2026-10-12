package Collections;
import java.util.*;
import java.util.ArrayList;
import java.util.LinkedList;

public class Javalinkedlist {
    public static void main(String[] args){
        LinkedList<Integer> a=new LinkedList<>();
        a.add(1);
        a.add(2);
        a.add(3);
        a.add(4);
        a.add(5);
        a.add(6);
        a.add(7);
        a.add(8);
        a.add(9);
        a.add(10);
        System.out.println(a);
        a.set(0,11);
        a.set(1,12);
        System.out.println(a);
        System.out.println(a.indexOf(6));
        System.out.println(a.lastIndexOf(5));
        a.remove(4);
        System.out.println(a);
        a.add(9, 15);
        System.out.println(a);
        System.out.println(a.isEmpty());
        int idx=a.indexOf(10);
        if(idx!=-1){
            a.add(idx+1,25);
        }
        System.out.println(a);
    }
}
