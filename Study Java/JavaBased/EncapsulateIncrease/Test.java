package EncapsulateIncrease;

import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
        // 学生对象能否被创建出来？为什么？
//        Student student = new Student("Kobe"); //对象都是通过构造方法来创建
        //每个类都会默认提供一个无参构造方法，可以省略不写
        /**
         * 重点：若创建了有参构造，则默认的无参构造就不会自动提供，需要程序员手动创建出来
         */

        // 已知name
        Student student1 = new Student("李四");

        // 键盘输入一个名字来录入学生对象中
        Scanner sc = new Scanner(System.in);
        System.out.println("输入一个名字");
        String name = sc.nextLine();
        Student student2 = new Student(name);
        Student s1 =new Student();
        s1.setName(name);
        System.out.println(s1.getName()); // 如果输入 张三 打印的结果为student2.name
        System.out.println(student2.getName()); // 打印的结果是 student2.name

    }
}
