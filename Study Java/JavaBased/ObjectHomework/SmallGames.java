package ObjectHomework;

import java.util.Scanner;

public class SmallGames {
    // 1.石头  2.剪刀 3.布
    public int computer(){
        int action =(int)(Math.random()*3+1);
        if(action==1){
            System.out.println("电脑：石头");
        }else if(action==2){
            System.out.println("电脑：剪刀");
        }else if(action==3){
            System.out.println("电脑：布");
        }else {
            System.out.println("没有这个选项");
        }
        return action;
    }
    public int player(){
        Scanner sc = new Scanner(System.in);
        System.out.println("请出拳 1.石头 2.剪刀 3.布");
        int num =sc.nextInt();
        int action = num;
        if(action==1){
            System.out.println("玩家：石头");
        }else if(action==2){
            System.out.println("玩家：剪刀");
        }else if(action==3){
            System.out.println("玩家：布");
        }else {
            System.out.println("没有这个选项");
        }
        return action;

    }
}
