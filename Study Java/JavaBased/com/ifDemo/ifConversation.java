package com.ifDemo;

public class ifConversation {
    public static void main(String[] args) {
        /**
         *  过安检：是否有车票  ticket 有车票就可以进入车站，进行二次按键
         *  如果没有车票则告知不得进入；二次按键是否有刀，且超过20cm如果超过则不能入内，如果没有就进入车站
         *
         */
        int ticket = 0; // 0:表示有 1：表示没有
        int knife = 0;  // 0:表示有 1：表示没有
        int knifeLength = 1;//0:表示没有超过1：表示超过
        if (ticket == 1) {
            System.out.println("无车票,不得入内");
        } else if (knife == 0 && knifeLength == 0) {
            System.out.println("不得进入车站");

        } else if (knife == 0 && knifeLength == 1) {
            System.out.println("刀具过长,不得入内");
        } else {
            System.out.println("可以进入");
        }
    }
}
