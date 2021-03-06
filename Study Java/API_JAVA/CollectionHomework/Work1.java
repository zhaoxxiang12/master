package CollectionHomework;

import java.util.ArrayList;
import java.util.Iterator;

public class Work1 {
    public static void main(String[] args) {
        // 1.删除所有的Charles元素然后再遍历
        ArrayList<String> list = new ArrayList<String>();
        list.add("charles");
        list.add("tina");
        list.add("jack");
        list.add("frank");
        list.add("tina");
        list.add("charles");
//        Iterator<String> iterator = list.iterator();
//        while (iterator.hasNext()) {
//            if ("charles".equals(iterator.next())) {
//                iterator.remove();
//            }
//        }
//        System.out.println(list);
        //2.判断两个集合list和list2是否有交集，并打印它们的交集
        ArrayList<String> list2 = new ArrayList<String>();
        ArrayList<String> list3 = new ArrayList<String>();
        list2.add("iis");
        list2.add("tina");
        list2.add("tomcat");
        list2.add("frank");
        list2.add("charles");
        list2.add("jboss");
        list2.add("charles");
        for (int i = 0; i < list.size(); i++) {
            String str = list.get(i);
            for (int j = 0; j < list2.size(); j++) {
                if (list.get(i).equals(list2.get(j)) && list3.indexOf(str) == -1) {
                    list3.add(str);
                }
            }
        }
        System.out.println(list3);
    }
}
