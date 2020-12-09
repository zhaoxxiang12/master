package DataTypeConversion;

public class AutoIncrement {
    public static void main(String[] args) {
        /**
         * 自增运算符
         *    ++a,a++ 单独使用时，效果是一样的 都是  a = a + 1
         */
        int a =10;
        int b = 1;

//        a = a+1;
//        a++;
        ++a;
//        a--;
//        System.out.println(a);
//        System.out.println(++b * 3); // 6 = ( b+1) * 3   ++ 放在前：先加后参与运算

        int c= 1;
//        System.out.println(c++ * 3); // 3 = c*3  c = c+1
        // ++ \ -- 放在后：先参与运算，最后再自增
//        System.out.println(c); //c

        int x= -2;
        int y = 5;
        if (1<x && x<5){
            System.out.println(1);
        }else if(x>5){
            System.out.println(2);
        }else {
            System.out.println(3);
        }
//        int z = x++ * 10 / --y;
//        System.out.println(x);
//        System.out.println(y);
//        System.out.println(z);
//        int w = x++ % 3 - --y + ++x ;
//        int z = x++ + ++x;
        // 考点：自增运算结束后元素就会自增/自减
//        System.out.println(x);
//        System.out.println(y);
//        System.out.println(w);
//        System.out.println(z);


    }
}
