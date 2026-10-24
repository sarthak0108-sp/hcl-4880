package exception;
public class UncheckedExceptionDemo {

    public static void main(String[] args) {

        try {
            int result = 10 / 0;
            System.out.println(result);

        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero!");
        }
        finally {
            System.out.println("Finally block executed!");
        }


        System.out.println("Program continues...");
    }
}
