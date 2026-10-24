package exception;

public class MultiCatchDemo {
    public static void main(String[] args) {

        int choice = 3;

        try {
            int a = 10;
            int b = 0;

            int[] arr = {10, 20, 30};

            String str = "abc";

            if (choice == 1) {
                // Condition 1: ArithmeticException
                int result = a / b;
                System.out.println("Result: " + result);

            } else if (choice == 2) {
                // Condition 2: ArrayIndexOutOfBoundsException
                System.out.println(arr[5]);

            } else if (choice == 3) {
                // Condition 3: NumberFormatException
                int num = Integer.parseInt(str);
                System.out.println("Number: " + num);
            }

        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero!");

        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index is out of range!");

        } catch (NumberFormatException e) {
            System.out.println("Invalid number format!");

        } finally {
            System.out.println("Finally block executed!");
        }

        System.out.println("Program continues...");
    }
}
