package stream;

import java.util.ArrayList;
import java.util.List;
import java.util.Comparator;

class Record {
    String name;
    int rollno;
    String hclid;
    String phoneno;

    Record(String name,int rollno,String hclid,String phoneno){
        this.name=name;
        this.rollno=rollno;
        this.hclid=hclid;
        this.phoneno=phoneno;
    }
}
public class Studentrecord{
    public static void main(String[] args){
        List<Record>a=new ArrayList<>();
        Record s1=new Record("Sarthak",226,"4880","9336906501");
        Record s2=new Record("Sanskar",223,"4223","700701213");
        a.add(s1);
        a.add(s2);
        a.stream().sorted(Comparator.comparing((Record r)->r.name).reversed()).forEach(r->System.out.println(r.name));


    }
}

