package Packaging;

/**
 * 局部变量泵手写访问修饰符 public  private
 */
public class FinalStudents {
    public static void main(String[] args) {
       final Students students = new Students("张三", 18);
       final int num = 10;
       // final 修饰基本类型:表示的是值不能被改变
        //final 修饰引用数据类型:是对象的地址不可变
       students.setAge(19);
    }
}
