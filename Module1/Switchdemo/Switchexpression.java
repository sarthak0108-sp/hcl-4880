package Switchdemo;

import java.util.Scanner;

public class Switchexpression {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int day=sc.nextInt();
        String result=switch(day){
            case 1->"Weekday";
            case 2->"Weekday";
            case 3->"Weekday";
            case 4->"Weekday";
            case 5->"Weekday";
            case 6->"Weekend";
            case 7->"Weekend";
            default -> "Invalid day";
        };
        System.out.println(result);
    }
}
