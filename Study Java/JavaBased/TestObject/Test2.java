package TestObject;

import java.util.Random;

public class Test2 {
    public static void main(String[] args) {
        Math.random();//[0,1)    Math.random()*900+1000 [1000,10000)
        Random random =new Random();
        int num =random.nextInt(3); //[012]
        System.out.println(num);
        // 1000~10000   random.nextInt(9001)+1000
    }
}
