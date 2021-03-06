package Collection;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.ListIterator;

public class listDemo4 {
    public static void main(String[] args) {
        ArrayList<String>list = new ArrayList<String>();
        list.add("a");
        list.add("b");
        list.add("c");
        list.add("a");
        list.add("e");
        list.add("a");
        list.add("z");
        // 将集合中所有的"a"元素删除(遍历方法)
        // 方法一:普通for循环遍历
//        for(int i = 0;i<list.size();i++){
//            if("a".equals(list.get(i))){
//                list.remove(i);
//            }
//        }
//        System.out.println(list);
         // 通过迭代器删除
        Iterator<String>iterator = list.iterator();
//        while (iterator.hasNext()){ // 判断迭代器是否有下一个元素
//            if("a".equals(iterator.next())) {
//                iterator.remove();
//            }
//        }
//        System.out.println(list);
//        while ((iterator.hasNext())){
//            String str = iterator.next();
//            if("a".equals(str)){
//                list.remove(str); //java.util.ConcurrentModificationException 并发修改异常
//            }
//        }
//        System.out.println(list);

        //并发修改异常的解决方案
//        ListIterator<String> listIterator = list.listIterator();
//        while ((listIterator.hasNext())){
//            String str = listIterator.next();
//            if("a".equals(str)){
//                listIterator.remove(); //正确
//                list.remove(str);// 错误
//            }
//        }
//        System.out.println(list);

        // 加强for循环不能删除元素  java.util.ConcurrentModificationException 加强for循环本质就是迭代器
        // 专业术语 加强for循环(for each循环)
//        for(String str:list){
//            if("a".equals(str)){
//                list.remove(str);
//            }
//        }
//        System.out.println(list);
    }
}
