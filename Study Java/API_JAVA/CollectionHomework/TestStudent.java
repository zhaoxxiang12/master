package CollectionHomework;

import java.util.ArrayList;

public class TestStudent {
    public static void main(String[] args) {
        // 1.创建五个学生
        Student s1 = new Student("张飞", "1", 95.5);
        Student s2 = new Student("关羽", "2", 97.5);
        Student s3 = new Student("刘备", "3", 96.5);
        Student s4 = new Student("赵云", "4", 99.5);
        Student s5 = new Student("黄忠", "5", 100);
        Student s6 = new Student("张飞", "1", 95.5);
        // 2.创建一个班级
        ArrayList<Student> list = new ArrayList<Student>();
        list.add(s1);
        list.add(s2);
        list.add(s3);
        list.add(s4);
        list.add(s5);
        list.add(s6);
//        System.out.println(list);
        //1.遍历打印  对象的遍历foreach
        for (Student s : list) { // 其中的s是一个局部变量,每次用来接收返回的遍历的对象
            System.out.println(s);
        }
        // 2.通过成绩升序排序
        System.out.println("-------正在进行成绩统计-------------");
        bubbleSort(list);
        for (Student stu : list) {
            System.out.println(stu);
        }
        //3.通过equals来判断对象,若所有的属性数据都相同,则表示是同一个对象

        System.out.println(s1.equals(s6)); // 未重写equals为false   重写equals为true
    }

    public static void bubbleSort(ArrayList<Student> list) {
        for (int i = 0; i < list.size() - 1; i++) { // 外层控制的是总的比较轮数
            for (int j = 0; j < list.size() - 1 - i; j++) {// 实现两个对象的比较
                if (list.get(j).getScore() > list.get(j + 1).getScore()) {
                    // 在集合中需要交换的是两个学生对象的元素
                    Student temp = list.get(j);
                    //list.set(index,value) 更新索引处的值
                    list.set(j, list.get(j + 1));
                    list.set(j + 1, temp);
                }
            }
        }
    }
}
