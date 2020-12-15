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
         */

        // 2 如何给数组赋值
        int [] arr = new int[4]; //动态
        System.out.println(arr); // [I@1b6d3586
        arr[0] = 10;//给数组元素赋值
        System.out.println(arr[0]); //访问数组元素

        float [] brr = new float[]{1,2,3,4,5}; //静态初始化
        System.out.println(brr);//[F@4554617c
        System.out.println(brr[0]);

        char [] chs = {'a','b','c'};//静态初始化简写
        System.out.println(chs);
    }
}
