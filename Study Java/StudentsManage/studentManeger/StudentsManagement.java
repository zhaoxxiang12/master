package studentManeger;

import java.util.ArrayList;
import java.util.Scanner;

public class StudentsManagement {
    public static void main(String[] args) {
        // 创建集合对象，用于存储学生数据
        ArrayList<Students> array = new ArrayList<Students>();

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
//                    System.out.println("添加学生");
                    addStudents(array);
                    break;
                case "2":
//                    System.out.println("删除学生");
                    deleteStudents(array);
                    break;
                case "3":
//                    System.out.println("修改学生");
                    updateStudents(array);
                    break;
                case "4":
//                    System.out.println("查看学生");
                    findAllStudents(array);
                    break;
                case "5":
                    System.out.println("Bye");
                    System.exit(0);
            }
        }

    }

    //定义一个添加学生的方法
    public static void addStudents(ArrayList<Students> array) {
        Scanner chose = new Scanner(System.in);
        System.out.println("请输入学生学号");
        String sid = chose.nextLine();
        System.out.println("请输入学生名字");
        String name = chose.nextLine();
        System.out.println("请输入学生年龄");
        String Age = chose.nextLine();
        System.out.println("请输入学生地址");
        String address = chose.nextLine();

        // 实例化对象
        Students student = new Students();
        // 创建学生对象，把输入的数据赋值给学生对象的成员变量
        student.setSid(sid);
        student.setName(name);
        try {
            int age = Integer.parseInt(Age);
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }
        student.setAddress(address);
        // 将学生对象添加到集合中
        array.add(student);
        //给出添加提示
        System.out.println("添加成功！");
    }

    //定义一个查看学生的方法
    public static void findAllStudents(ArrayList<Students> array) {
        //判断集合是否有数据
        if (array.size() == 0) {
            System.out.println("无数据");
            //为了程序不在往下执行
            return;
        }


        //显示表头信息
        // \t为tab建的位置
        System.out.println("学号\t\t姓名\t\t年龄\t\t居住地");
        //将集合中的数据取出按照对应格式显示学生信息，年龄显示补充“岁”
        for (int i = 0; i < array.size(); i++) {
            Students s = array.get(i);
            System.out.println(s.getSid() + "\t\t" + s.getName() + "\t" + s.getAge() + "岁\t\t" + s.getAddress());
        }
    }

    // 定义一个方法用于删除学生
    public static void deleteStudents(ArrayList<Students> array) {
        // 键盘输入要删除的学生学号，显示提斯和信息
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入要删除的学生学号:");
        String sid = sc.nextLine();
        // 遍历集合将对应学生对象从集合中删除
        for (int i = 0; i < array.size(); i++) {
            Students student = array.get(i);
            if (student.getSid().equals(sid)) {
                array.remove(i);
                break;
            } else {
                System.out.println("没有找到该学生");
            }
        }

        //给出删除提示
        System.out.println("删除成功");
    }

    // 定义一个方法用于修改学生
    public static void updateStudents(ArrayList<Students> array) {
        //键盘录入数据，显示提示信息
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入要修改的学生的学号");
        String sid = sc.nextLine();
        //录入要修改学生的信息
        System.out.println("请输入新的姓名");
        String name = sc.nextLine();
        System.out.println("请输入新的年龄");
        String age = sc.nextLine();
        System.out.println("请输入新的地址");
        String address = sc.nextLine();

        //创建学生对象
        Students student = new Students();
        student.setSid(sid);
        student.setName(name);
        try {
            int Age = Integer.parseInt(age);
            student.setAge(Age);
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }
        student.setAddress(address);
        //遍历集合修改对应的学生信息
        for (int i = 0; i < array.size(); i++) {
            Students s= array.get(i);
            if (s.getSid().equals(sid)) {
                array.set(i, student);
                break;
            }
        }
        //给出提示
        System.out.println("修改成功");
    }
}
