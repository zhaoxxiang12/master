package EncapsulateIncrease;

import java.util.Arrays;

public class TestPoker {
    public static void main(String[] args) {
        Poker poker = new Poker();
        poker.init();
//        System.out.println(Arrays.toString(poker.getPoker()));
        poker.showPoker();
        poker.Shuffle();
        poker.licensing();
    }
}
