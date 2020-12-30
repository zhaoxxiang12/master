package ObjectInheritance5;

import java.util.Arrays;

public class StaticDemo {
    public static void main(String[] args) {
        // 1.请统计一共创建了多少个学生对象
        Student s1 =new Student();
        Student s2 = new Student();
        Student s3 = new Student();
        Student s4 = new Student();
        Student s5 = new Student();
        Student s6 = new Student();
        s1.count();

        // 静态方法的访问
        Student.say(); // 类名.方法名
        System.out.println();

        int a [ ] = {1,56,89,99987,789,639,54,123,957,654,7894};
        Arrays.sort(a); //快速排序
        System.out.println(Arrays.toString(a));


        int [] b =  Student.bubbleSort(a);
        System.out.println(Arrays.toString(b));
    }
}
