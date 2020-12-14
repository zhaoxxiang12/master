package PositionOperation;

public class Position {
    public static void main(String[] args) {
        /**
         * 计算机所有的计算都是以补码的形式计算
         *
         * 计算机只认识二进制的补码
         *
         * 作用：位运算符可以提高程序运行效率,加密算法
         *
         * byte 2 & 4  & 按位与
         *
         * 2二进制  0000 0010
         * 3二进制  0000 0011
         *
         * -----&--------两个同时为1才会是1，其余为零
         *
         * -----|--------主要有一个1为1才为1，两个都为都为0才为0
         *
         * ------^------异或  规则：两个不一样就为1，一样就为0 特殊规则  x^y=z z^y就可以获取到x
         */
        byte a = +3; //占1byte
        int  b = +3; //占4byte

//        System.out.println(2&3); //  2的二进制位0010  3的二进制位 0011  &运算规则是参与两个数的二进制 位同
//        // 时为1 就为1，否则为零，计算结果是 0010 十进制为2
//        System.out.println(2|5);//&运算规则是参与两个数的二进制位有一个为1 就为1，两个同时为零就为零
//        // 计算结果是 0111 十进制为7
//        System.out.println(2^5); // 两个不一样就为1，一样就为0  结果为0111  十进制7

        /**
         *
         异或特殊规则

         正文：1314
         私钥：666
         密文：正文^私钥
         解密：密文^私钥

         1314 二进制：10100100010
         666  二进制：01010011010
         密文：       11110111000     1976
                     01010011010
         解密：       10100100010    解密正文


         ~ 按位取反
            3 的二进制 0000   0011
                     1111   1100       如果按位与的最高位结果为1  表示负数
                     1000   0011   反码
                     1000   0100   源码
         */
        System.out.println(~3); // -4

        /**
         *
         * 重点掌握i
         * 左移 <<
         4<< 两位

         4补码：0000   0100
               0001   0000   十进制16

         规律：一个数左移了 n 位 结果相当于 这个数乘以2的n次方

         如何高效计算3*8  3<<3

         *
         *
         右移 >>
         10>>1
         10的补码：0000  1010
         ----------右移------
                 0000   0101

         一个数右移多少位，相当于除以 2 的n次方

         容器为10，想扩容到以前的2倍  向左移2位
         容器为10，想扩容到以前的1.5倍
         */
        int bb= 10;
        System.out.println(bb+(bb>>1));

    }
}