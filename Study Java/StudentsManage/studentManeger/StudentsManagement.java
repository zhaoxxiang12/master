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
                    System.out.println("添加学生");
                    addStudents(array);
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
    //定义一个添加学生的方法
    public  static  void addStudents(ArrayList<Students>array){
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
        Students student  = new Students();
        // 创建学生对象，把输入的数据赋值给学生对象的成员变量
        student.setSid(sid);
        student.setName(name);
        try{
            int age = Integer.parseInt(Age);
        }catch (NumberFormatException e){
            e.printStackTrace();
        }
        student.setAddress(address);
        // 将学生对象添加到集合中
        array.add(student);
        //给出添加提示
        System.out.println("添加成功！");
    }
//    //定义一个查看学生的方法
//    public static void findAllStudengts(ArrayList<Students>array){
//        //显示表头信息
//        System.out.println("学号\t\t\t姓名\t\t年龄\t\t居住地");
//        //将集合中的数据取出按照对应格式显示学生信息，年龄显示补充“岁”
//        for (int i = 0;i<array.size();i++){
//            Students s = array.get(i);
//            System.out.println(s.getSid()+"\t"+s.getName()+"\t"+s.getAge()+"岁\t\t"+s.getAddress());
//        }
//    }
}