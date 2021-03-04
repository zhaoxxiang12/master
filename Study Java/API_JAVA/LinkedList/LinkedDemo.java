package LinkedList;

import java.util.LinkedList;

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

        //2.删除
        list.remove();//默认从表头开始删除
        list.remove(3); //删除下标3的元素
        System.out.println(list);
    }
}
