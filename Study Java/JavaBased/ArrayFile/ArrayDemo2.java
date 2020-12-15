package ArrayFile;

public class ArrayDemo2 {
    public static void main(String[] args) {
        /**
         * 当堆中的对象没有栈中的变量引用时，那么这个堆中的对象就会成为垃圾，Java有自动回收机制(不定期回收)
         *
         */
        int [] arr = {1,2,3,4};
        int [] brr = arr; // 将brr的地址指向arr的地址 存放的都是地址
        System.out.println(arr);
        System.out.println(brr);
    }
}
