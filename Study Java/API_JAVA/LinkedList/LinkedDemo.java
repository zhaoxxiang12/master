package LinkedList;

import java.util.LinkedList;

/**
 * 使用场景  出频繁添加，删除操作时建议使用LinkedList
 */
public class LinkedDemo {
    public static void main(String[] args) {
        // LinkedList通过Deque(双端队列)来实现的(双向链表)
        LinkedList<Integer>list = new LinkedList<>();
        //1.追加方法放链表元素1-2-3-4-5
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        list.add(5);
        list.addFirst(666);// 从链表头开始添加元素
        list.addLast(888); // 从链表尾开始添加元素
        list.removeFirst(); // 从表头删除
        list.removeLast(); //从表尾删除

        //2.删除
        list.remove();//默认从表头开始删除
        list.remove(3); //删除下标3的元素  删除原理：先查询到然后再删除
        System.out.println(list);

        // 常用方法
        list.clear(); //清空集合
        System.out.println(list.size());//求集合长度
        System.out.println(list.contains(3));//判断是否包含某个元素
        list.
    }
}
