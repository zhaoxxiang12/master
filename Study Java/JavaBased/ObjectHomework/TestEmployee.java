package ObjectHomework;

import java.util.Scanner;

public class TestEmployee {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入薪资");
        Employee employee = new Employee();
        //员工名字
        employee.name = "jack";
        //员工薪资
        employee.salary = sc.nextFloat();
        //员工工号
        employee.sno = "asd12";
        //员工年龄
        employee.age=35;
        //员工性别
        employee.sex="男";
        employee.identify(employee.salary);
        employee.info();
    }
}
