package DataTypeConversion;

public class DataType {
    public static void main(String[] args) {
        short f = 32767;
//        byte f = 127;
//        short h =f;
//       short h = f+1;
//       short h = f+1// 出错：1是int,f是short 求和后的类型应该是int

        int q = 2147483647;
        long e = 1L;
        int w = q+1; // 数据自动溢出1
//        int n = e+1;  // 数据自动溢出

        System.out.println(w);
//        System.out.println(n);

    }
}
