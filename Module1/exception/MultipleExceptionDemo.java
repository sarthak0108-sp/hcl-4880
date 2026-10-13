package exception;


public class MultipleExceptionDemo {

    public static void main(String[] args) {

        try {
            int[] arr = {10, 20, 30};

            int result = 10 / 0;
            System.out.println(result);

            System.out.println(arr[5]);

        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero!");

        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index is out of range!");

        } finally {
            System.out.println("Finally block executed!");
        }

        System.out.println("Program continues...");
    }
}
