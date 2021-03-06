package ArrayFile;

import java.util.ArrayList;

public class Test {
    public static void main(String[] args) {
//        ArrayList<Integer> list = new ArrayList<Integer>();
//        list.add(1);
//        list.add(2);
//        list.add(1);
//        list.add(3);
//        list.add(1);
//        System.out.println(list.indexOf(4));
        ArrayList<String> list2 = new ArrayList<String>();
        list2.add("charles");
        list2.add("tina");
        list2.add("jack");
        list2.add("frank");
        list2.add("charles");
        list2.add("tina");
        list2.add("charles");


        ArrayList<String> list3 = new ArrayList<String>();
        list3.add("iis");
        list3.add("tomcat");
        list3.add("tina");
        list3.add("frank");
        list3.add("charles");
        list3.add("jboss");
        list3.add("charles");
        ArrayList<String> list4 = new ArrayList<String>();

        for (int i = 0; i < list2.size(); i++) {
            String str = list2.get(i);
            for (int j = 0; j < list3.size(); j++) {
                if (str.equals(list3.get(j)) &&list4.indexOf(str)==-1) {
                   list4.add(str);
                }
            }
        }
        System.out.println(list4);
    }
}
