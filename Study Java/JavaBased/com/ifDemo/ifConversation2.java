package com.ifDemo;

public class ifConversation2 {
    public static void main(String[] args) {
        // 多分支选择
        /**
         * if(条件1){
         *     // 条件1成立执行
         * }else if(条件2){
         *     条件2成立执行
         * }else{
         *     以上条件都不满足执行
         * }
         * 多分支不写else 是语法是正确的，但是缺少完整的语义
         *
         * 如下题
         *
         * 百分制分数【90，100】 A等级
         * 百分制分数【80,90) B等级
         * 百分制分数【70,80) C等级
         * 百分制分数【60，70) D等级
         * 百分制分数【0，60) E等级
         */
        int score = 100;
        if (90 <= score && score == 100) {
            System.out.println("A");
        } else if (80 <= score && score < 90) {
            System.out.println("B");
        } else if (70 <= score && score < 80) {
            System.out.println("C");
        } else if (60 <= score && score < 70) {
            System.out.println("D");
        } else if(0 <= score && score < 60) {
            System.out.println("E");
        }else{
            System.out.println("不是百分制分数");
        }
    }
}