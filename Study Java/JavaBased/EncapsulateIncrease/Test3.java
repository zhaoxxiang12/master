package EncapsulateIncrease;

import java.util.Scanner;

public class Test3 {
    public static void main(String[] args) {
        Student[] students = new Student[3];
        Scanner sc = new Scanner(System.in);
        for (int i = 0; i < students.length; i++) {
            System.out.println("输入姓名");
            String name = sc.next();
            System.out.println("输入年龄");
            int age = sc.nextInt();
            // 需要将学生对象存入数组中
            students[i] = new Student(name, age); // 每循环一次就会创建一个新的Students对象
        }
        System.out.println(students[0].getName()+"→"+students[0].getAge());
        System.out.println(students[1].getName()+"→"+students[1].getAge());
        System.out.println(students[2].getName()+"→"+students[2].getAge());
    }
}
