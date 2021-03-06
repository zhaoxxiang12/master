package CollectionHomework;

import java.util.ArrayList;

public class EmployeeTest {
    public static void main(String[] args) {
        Employee s1 = new Employee("张飞", "1", 95.5);
        Employee s2 = new Employee("关羽", "2", 97.5);
        Employee s3 = new Employee("刘备", "3", 96.5);
        Employee s4 = new Employee("赵云", "4", 99.5);
        Employee s5 = new Employee("黄忠", "5", 100);
        Employee s6 = new Employee("张飞", "1", 95.5);
        int h1 = s1.hashCode();
        int h2 = s6.hashCode();
//        System.out.println(h1 == h2);

//        System.out.println(s1==s6); // false

        ArrayList<Employee>list  =new ArrayList<Employee>();
        //实现功能:内容相同的元素不能放入集合中
        list.add(s1);
        list.add(s2);
        list.add(s3);
        list.add(s4);
        list.add(s5);
        list.add(s6);

//        System.out.println(list);
        // 如何实现ArrayList去重
        //重写hashCode和equals，通过contains来实现
        ArrayList<Employee>li  =new ArrayList<Employee>();
        for(Employee emp:list){
            if(!li.contains(emp)){ // 重写了equals和hashCode时，contains比较就会按照我们自己的规则来判断是否是同一个对象
                li.add(emp);
            }
        }
        System.out.println(li);
        // 如果hashCode一样,则equals不一定相同
        // 如果equals一样则hashCode一定一样(只有hashCode相同时才会调用equals来判断)
    }
}
