package Collection;

import java.util.ArrayList;

/**
 * 泛型的主要作用:可以将类型的检查从运行期提前到了编译期,有效解决了下转型存在的安全隐患
 */
public class ListDemo2 {
    public static void main(String[] args) {
        //JDK1.5之后的集合  解决了下转型的安全隐患
        ArrayList<Integer> list = new ArrayList<Integer>(); //当前的这个集合中他只能存放整形数据且为int
        //1.向集合中追加添加元素
        list.add(100);
        list.add(1);
        list.add(100);
        list.add(88);
        list.add(99);
       //2.查看集合的个数
        System.out.println(list.size());
        //3.在指定位置更新元素
        list.set(1,998);
        System.out.println(list);
        //4.在指定位置处插入元素
//        list.add(2,666); //实现了方法重载
        System.out.println(list);
        //5.删除元素
        list.remove(1); // 从指定索引出删除(当下标与集合中的值一样时,优先删除下标的值)
        System.out.println(list);
    }
}
