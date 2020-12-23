package ObjectEncapsulate;

import java.util.Arrays;

public class Poker {
    private String[] color = {"♥", "♦", "♠", "♣"}; //花色
    private String[] number = {"A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "Q", "J"};
    private String[] poker = new String[54]; // 一副扑克牌有54张

    public void init() {
        int index = 0;
        for (int i = 0; i < number.length; i++) {// 点数
            for (int j = 0; j < color.length; j++) {// 点数
//                System.out.println(color[j]+number[i]);
                poker[index] = color[j] + number[i];
                index++;
            }
        }
        poker[index++] = "小王";
        poker[index] = "大王";
//        show();
    }

    public static void main(String[] args) {
        Poker poker1 = new Poker();
        poker1.init();
        poker1.show();
    }

    public void show() {
        for (int i = 0; i < poker.length; i++) {
            System.out.println(poker[i] + "\t");
            if ((i + 1) % 4 == 0) {
                System.out.println();
            }
        }
    }
}
