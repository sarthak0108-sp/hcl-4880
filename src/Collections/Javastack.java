package Collections;

import java.util.Stack;

public class Javastack {
    public static void main(String[] args) {
        Stack<Integer> st = new Stack<>();
        st.push(6);
        st.push(28);
        st.push(1000);
        System.out.println(st);
        System.out.println(st.pop());
        System.out.println(st.peek());
        System.out.println(st.search(28));


    }
}
