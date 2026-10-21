package com.sample.constructordi;
import com.sample.setterdi.Address;

public class Employee {
    private Address address;

    public Employee(Address address){
        this.address=address;
    }
    public void getEmpAddress(){
        address.getAddress();
    }
}
