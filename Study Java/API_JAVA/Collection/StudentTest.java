package Collection;

import CollectionHomework.Student;

public class StudentTest {
    public static void main(String[] args) {
        Student s1 = new Student("张飞", "1", 95.5);
        Student s2 = new Student("关羽", "2", 97.5);
        Student s3 = new Student("刘备", "3", 96.5);
        Student s4 = new Student("赵云", "4", 99.5);
        Student s5 = new Student("黄忠", "5", 100);
        Student s6 = new Student("张飞", "1", 95.5);
        System.out.println(s1);
        int h1 = s1.hashCode();
        int h2 =s2.hashCode();
        System.out.println(h1==h2);
        System.out.println(s2);

        // 判断是否是同一个对象,(首先判断地址,若地址相同则判断元素equals)
    }
}
