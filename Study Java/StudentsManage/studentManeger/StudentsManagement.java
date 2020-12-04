package studentManeger;

import java.util.ArrayList;
import java.util.Scanner;

public class StudentsManagement {
    public static void main(String[] args) {
        while (true) {
            // 主界面编写
            System.out.println("--------Welcome--------");
            System.out.println("1.添加学生");
            System.out.println("2.删除学生");
            System.out.println("3.修改学生");
            System.out.println("4.查看学生");
            System.out.println("5.退出系统");
            // 实现键盘录入
            Scanner sc = new Scanner(System.in);
            String chose = sc.nextLine();
            // switch 语句完成选择
            switch (chose) {
                case "1":
                    System.out.println("添加学生");
                    break;
                case "2":
                    System.out.println("删除学生");
                    break;
                case "3":
                    System.out.println("修改学生");
                    break;
                case "4":
                    System.out.println("查看学生");
                    break;
                case "5":
                    System.out.println("Bye");
                    System.exit(0);
            }
        }

    }
}
