package com.ifDemo;

public class ifConversation {
    public static void main(String[] args) {
        /**
         *  过安检：是否有车票  ticket 有车票就可以进入车站，进行二次按键
         *  如果没有车票则告知不得进入；二次按键是否有刀，且超过20cm如果超过则不能入内，如果没有就进入车站
         *
         */
//        int ticket = 0; // 0:表示有 1：表示没有
//        int knife = 0;  // 0:表示有 1：表示没有
//        int knifeLength = 1;//0:表示没有超过1：表示超过
//        if (ticket == 1) {
//            System.out.println("无车票,不得入内");
//        } else if (knife == 0 && knifeLength == 0) {
//            System.out.println("不得进入车站");
//
//        } else if (knife == 0 && knifeLength == 1) {
//            System.out.println("刀具过长,不得入内");
//        } else {
//            System.out.println("可以进入");
//        }
//
        /**
         *  嵌套if语句
         *
         */
//            boolean hasTicket = true;//true:有票   false： 无票
//            int knifeLength = 21; //刀的长度
//        if (hasTicket){
//            if(knifeLength>21){
//                System.out.println(" 管制刀具过长，不得入内");
//            }else{
//                    System.out.println(" 可以进站");
//            }
//        }else{
//            System.out.println("无票，不得进入");
//        }
        /**
         * 单分支特殊情况
         *  if  else 可与三元运算符相互转换
         */
        int a ;
        int b =20;
        if (b%4==0){
            a=1;
        }else{
            a=0;
        }
        // 等效于 下面的三元运算符
        int x = b%4==0?1:0;

        /**
         * 特俗语法 只有if  可以省略{}
         */
        int y =45;
        if (y%9==0){
            System.out.println(" 123");
        }
    }
}
