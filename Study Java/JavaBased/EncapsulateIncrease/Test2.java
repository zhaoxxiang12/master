package EncapsulateIncrease;

import java.util.Arrays;
import java.util.Scanner;

public class Test2 {
    public static void main(String[] args) {
        //1. 键盘输入一个名字和年龄来录入学生对象中(需要录入三组学生对象中)
        Student[] students = new Student[3];
        Scanner sc = new Scanner(System.in);
        Student student = new Student(); // 经常容易出现错误的地方

        for (int i = 0; i < students.length; i++) {
            System.out.println("输入姓名");
            String name = sc.next();
            student.setName(name);

            System.out.println("输入年龄");
            int age = sc.nextInt();
            student.setAge(age);

            // 需要将学生对象存入数组中
            students[i] = student;
        }
        System.out.println(Arrays.toString(students));
        System.out.println(students[0].getName());
        System.out.println(students[1].getName());
        System.out.println(students[2].getName());
    }
}
