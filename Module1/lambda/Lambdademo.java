package lambda;

@FunctionalInterface
interface Calculator{
    double calculate(int a,int b);
}

public class Lambdademo {
     public static void main(String[] args){
         Calculator add=(a,b)->a+b;
         System.out.println("Sum:"+add.calculate(10,20));
         Calculator sub=(a,b)->a-b;
         System.out.println("Subtraction:"+sub.calculate(20,10));
         Calculator mul=(a,b)->a*b;
         System.out.println("Multiplication:"+mul.calculate(10,20));
        // Runnable r=()->System.out.println("Hello lambda");
         //r.run();
     }
}
