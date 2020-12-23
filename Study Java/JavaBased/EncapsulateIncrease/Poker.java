package EncapsulateIncrease;

import java.util.Arrays;
import java.util.Random;

public class Poker {
    private String[] color = {"♥", "♦", "♠", "♣"};// 花色
    private String[] number = {"A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "Q", "J"}; // 数字
    private String[] poker = new String[54];// 扑克牌
    private MyArray playerOne = new MyArray(17);
    private MyArray playerTwo = new MyArray(17);
    private MyArray playerThree = new MyArray(17);
    private MyArray base = new MyArray(3); //底牌

    // 1.初始化一副牌
    public void init() {
        int index = 0; // 扑克牌的索引
        //将52张四种花色的牌存入数组中
        for (int i = 0; i < number.length; i++) { //外层循环次数
            for (int j = 0; j < color.length; j++) {//内层循环花色
                poker[index] = color[j] + number[i];
//                System.out.println(color[j] + number[i]);
                index++;
            }
        }
        // 再将大小王存入数组中
        poker[index++] = "大王";
        poker[index] = "小王";
    }

    /**
     * 2.看牌
     */
    public void showPoker() {
        System.out.println("-----------------看牌---------------");
        for (int i = 0; i < poker.length; i++) {
            System.out.print(poker[i] + "\t");
            if ((i + 1) % 4 == 0) {
                System.out.println();
            }
        }
    }

    /**
     * 3.洗牌
     */
    public void Shuffle() {
        System.out.println("-----------------洗牌---------------");
        for (int i = 0; i < poker.length; i++) {
            //随机获取
            Random random = new Random();
            int number = random.nextInt(54);
            // 实现初始位置和随机位置的元素牌互换
            String temp = poker[i];
            poker[i] = poker[number];
            poker[number] = temp;
        }
        showPoker(); // 洗完牌再打印看牌
    }

    /**
     * 4.随机发放三张牌
     */
    public void licensing() {
        for (int i = 0; i < poker.length; i++) {
            if (i < poker.length - 3) {//判断是否是底牌
                if (i % 3 == 0) {
                    playerOne.add(poker[i]);
                } else if (i % 3 == 1) {
                    playerTwo.add(poker[i]);
                } else {
                    playerThree.add(poker[i]);
                }

            } else {
                base.add(poker[i]);
            }
        }
        System.out.println();
        System.out.println("AA"+Arrays.toString(playerOne.getStr()));
        System.out.println("BB"+Arrays.toString(playerTwo.getStr()));
        System.out.println("CC"+Arrays.toString(playerThree.getStr()));
        System.out.println("底牌"+Arrays.toString(base.getStr()));


    }

    public String[] getPoker() { // 方法返回数组类型
        return poker;
    }
}
