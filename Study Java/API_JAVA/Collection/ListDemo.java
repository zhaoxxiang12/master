package Collection;

import java.util.ArrayList;

public class ListDemo {
    public static void main(String[] args) {
        //JDK1.5版本时的集合
        ArrayList list = new ArrayList();
        list.add("1");
        list.add("2");
        list.add(true);
        list.add(1);
        list.add(12.3);
        System.out.println(list.size());
        //System.out.println(list.toString());
        //1.查看集合中的元素
        System.out.println(list);
        // 将所有的数字*100
        for (int i = 0; i < list.size() - 1; i++) {

        }

        // 2.获取指定索引出集合的元素list.get()
        Object obj = list.get(3);
        if (obj instanceof Integer) {//判断obj是否属于整形类型的数据
            int num = (Integer) obj;
            System.out.println(num * 100);
        }
//        Integer n = (Integer)list.get(0); // list.add("1") 下转型:java.lang.ClassCastException
        //工作中:集合中推荐使用同一种数据类型

        //为了解决下转型带来的安全问题.最终在JDK1.5版本提出了一个全新的概念:泛型
        //泛型:表示广泛的类型(通用类型规范)  语法:<类型(任意类型)> <T> <E>  <K,V> 当自己需要定义泛型时建议使用大写字母

    }
}
