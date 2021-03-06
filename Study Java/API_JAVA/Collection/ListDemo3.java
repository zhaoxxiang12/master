package Collection;

import java.util.ArrayList;
import java.util.Iterator;

public class ListDemo3 {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<Integer>();
        list.add(100);
        list.add(1);
        list.add(666);
        list.add(88);
        list.add(99);
        //list是有序的(存和取的顺序是一致的)

        //1.集合基础for循环的遍历
//        for (int i = 0; i < list.size(); i++) {
//            System.out.println(list.get(i));
//        }
        //2.集合的迭代器遍历(集合本身不具有迭代能力)
        Iterator<Integer> iterator = list.iterator(); //将集合放入到迭代器(放入一个容器中,并且每个小隔间都有指针)
        while (iterator.hasNext()) { // 判断迭代器中是否有下一个元素,若到了集合最后则返回false
            System.out.println(iterator.next());
        }
//        Integer n1 = iterator.next(); // 每次都会返回一个当前值,并且将指针指向下一个元素
//        Integer n2 = iterator.next();
//        Integer n3 = iterator.next();
//        Integer n4 = iterator.next();
//        Integer n5 = iterator.next();
//        Integer n6 = iterator.next(); //java.util.NoSuchElementException 表示找不到元素了(已经访问到了集合的最终位置)

        //3.集合的加强for循环遍历(底层使用迭代器来实现的,只不过是一种简写方式)
        /**
         * 加强for循环语法
         * for(迭代后的类型 变量: 可以迭代的对象){
         *     循环体
         * }
         */
        for (int i : list) {
            System.out.println(i);
        }
    }
}
