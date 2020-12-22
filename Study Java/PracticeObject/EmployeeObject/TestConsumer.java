package EmployeeObject;

import java.util.Date;

public class TestConsumer {
    public static void main(String[] args) {
        Consumer consumer =new Consumer(); //无参构造
        consumer.setId(1000211);
        consumer.setName("Kobe");
        consumer.setAge(27);
        consumer.setSex('男');
        consumer.setBirthday(new Date());
        // 研究对象是如何创建出来的？
        /**
         * new Consumer();   Consumer()构造方法/构造函数
         */
        Consumer consumer2 = new Consumer(1,"James",'男',58,new Date());
        Consumer consumer3 = new Consumer(12101);
//        System.out.println(consumer2.getName());


        Consumer consumer4 = new Consumer(25); //

    }

}
