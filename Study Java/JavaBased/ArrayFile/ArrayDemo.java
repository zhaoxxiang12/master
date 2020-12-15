package ArrayFile;

public class ArrayDemo {
    public static void main(String[] args) {
        /**
         * 数据：将同一类型的数据存放在一个容器中
         *
         * 数据符号 []
         *
         * 1.数组定义的三种形式： 类型[] 变量 = new 类型 【长度】
         * int [] arr = new int【3】
         * int [] brr = new int[]{1,2,3}
         * int [] crr = {1,2,3}
         * System.out.println(arr[]0)
         *
         * java 的数据类型
         *
         * 基本类型  八种
         *
         * 引用类型
         *
         * 数组    字符串    类   枚举
         *
         * 初始值为null 表示空，没有的 特殊的预留值
         *
         */

        // 2 如何给数组赋值
//        int [] arr = new int[4]; //动态
//        System.out.println(arr); // [I@1b6d3586
//        arr[0] = 10;//给数组元素赋值
//        System.out.println(arr[0]); //访问数组元素
//
//        float [] brr = new float[]{1,2,3,4,5}; //静态初始化
//        System.out.println(brr);//[F@4554617c
//        System.out.println(brr[0]);
//
//        char [] chs = {'a','b','c'};//静态初始化简写
//        System.out.println(chs);

        //数组索引的范围[0,数组长度-1]
        int [] arr = {1,23,3,4,9};
        System.out.println(arr); //直接打印出来是一个地址
        System.out.println(arr[0]);//访问数组下标为0的元素
        //1.数组的长度计算
        System.out.println(arr.length);
        //2.数组索引越界

        //System.out.println(arr[5]);//ArrayIndexOutOfBoundsException 数组索引越界
        /**
         * 如何解决  解决方案 让索引在[0,(arr.length)-1]  length 是数组的属性
         *
         */
        // 访问了一个不存在的索引（index<0  |index>最大索引）
        arr = null; // arr 是一个地址，指的是引用为空，不指向堆中任何一个值
        //System.out.println(arr);
        int brr; // 声明变量，如果没有做初始化，是不能直接使用的，编译会报错
        System.out.println(arr.length);//运行会报错，NullPointerException 空指针异常
        /**
         * 产生原因：null.属性  或者方法  我们的引用为空 访问了一个具体对象中的属性或者方法 就会出现空指针
         *
         * 解决方案：1.使用if(arr!=null)来过滤空指针
         *
         */



        /**
         * 判断空指针
         * 下面选项那个会报错
         * A. System.out.println(3>5&&arr.length>0) 不会报错   后面表达式被短路
         * B. System.out.println(3<5&arr.length>0) // 会报错  会比较两次  会报空指针
         * C. System.out.println(3<5|arr.length>0) // 会报错 会比较两次  会出现空指针
         * D. System.out.println(3<5||arr.length>0) 不会报错 表达式被短路
         *
         */
    }
}
