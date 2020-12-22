package TestObject;

import ObjectEncapsulate.Customer2;

public class Test {
    public static void main(String[] args) {
        Customer2 customer2 = new Customer2();
        customer2.setAge(78);
        System.out.println(customer2.getAge());
//        System.out.println(customer2.name);//默认访问修饰符（不能跨包）
//        System.out.println(customer2.sno); // protected 其他包不可用
    }
}
