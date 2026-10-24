package Switchdemo;

import java.util.Scanner;

public class Yielddemo {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int day=sc.nextInt();
        String result=switch(day){
            case 1,2,3,4,5-> {
                System.out.println("Working day");
                yield "Weekday";
            }
            case 6,7-> {
                System.out.println("Off day");
                yield "Weekend";
            }
            default->{
                System.out.println("Invalid input");
                yield "Invalid day";
            }

        };
    }
}
