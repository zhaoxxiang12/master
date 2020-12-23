package HomeworkDemo;

public class StringDemo6 {
    public static void main(String[] args) {
         // 1.某个字符再字符串中出现的次数
        String s ="baidu_duliang_yp";
        String s1 = "你好我好大家好，才是真的好，你好吗";
        int index = s.indexOf("a");
        int index2 = s.indexOf("你好");
        int index3=s1.indexOf("你好",1); //结果14，表示从下标1开始进行查询，在下标14再次出现

        System.out.println(index);
        System.out.println(index2);
        System.out.println(index3);

        //2.某个字符最后一次出现的索引
        System.out.println(s.lastIndexOf("_"));
    }
}
