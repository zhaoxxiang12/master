package HomeworkDemo;

public class StringDemo4 {
    public static void main(String[] args) {
        /**
         * String 辅助计算方法
         */
        // 1.判断字符串以什么开始
        String s1 = "南充,我回来啦";
        boolean flag = s1.startsWith("南充");
//        System.out.println(flag);
        // 找出下列名单中所有姓张的员工
        String[] names = {"张三", "李四", "王五", "张三丰", "张无忌"};
        for (int i = 0; i < names.length; i++) {
            if (names[i].startsWith("张")) {
                System.out.println(names[i]);
            }
        }
        // 2.判断字符串以什么结尾
        String s2 = "上海蔚一";
        boolean flag2 = s2.endsWith("23");
        System.out.println(flag2);
        String[] fieldList = {"作业.txt", "面向对象.doc", "数组.doc", "风景.jpg", "笑话.doc"};
        // 找出word文档doc/docx
        for (int i = 0; i < fieldList.length; i++) {
            String name = fieldList[i];
            if (name.endsWith(".doc") || name.endsWith(".docx")) {
                System.out.println(name);
            }
        }
    }
}
