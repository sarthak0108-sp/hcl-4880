package generics;

class Box<T>{
    private T val;
    public void setValue(T value){
        this.val=value;
    }
    public T getValue(){
        return val;
    }
}
public class Genericsdemo {
    public static void main(String[] args){
      Box<String> s=new Box<>();
      s.setValue("Jai Shree Ram");
      System.out.println(s.getValue());

      Box<Integer> a=new Box<>();
      a.setValue(01);
      System.out.println(a.getValue());

      Box<Double> d=new Box<>();
      d.setValue(10.5);
      System.out.println(d.getValue());
    }
}

