package DataTypeConversion;

public class RelationOperate {
    public static void main(String[] args) {
        // 重点：如何判断两个值是否相等
        // Java  中 = 表示赋值 将等号右边的值赋值给左边
        // 1.基本数据类型 （八种） 通过 ==比较数值
//        System.out.println(5==5);
//        System.out.println(5.0==5); // 特殊
//        System.out.println(true==true); //不推荐
//        System.out.println(3<5==true); // 程序开发中尽量避免此种写法

        // 2.引用数据类型   字符串 == 比较的是地址
        String str = "zbc"; //字符串常量
        String str2 = "zbc";
        String str3 = new String("zbc"); // 开辟了一个新的空间
        System.out.println(str == str2); //地址相同
        System.out.println(str == str3); //地址不相同

        // 只比较 字符串的内容
        System.out.println(str.equals(str3)); //true
    }
}
