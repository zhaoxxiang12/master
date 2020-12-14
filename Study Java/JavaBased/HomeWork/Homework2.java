package HomeWork;

public class Homework2 {
    public static void main(String[] args) {
        /**
         * 求1！+5！+。。。。+17！
         */
//      int i = 1;
//      long sum =0;
//      while (i<=17){
//          //对每次循环后的数求阶乘
//          long ji = 1;
//          int j =i;
//          while(j>0){
//              ji*=j;
//              j--;
//          }
//          System.out.println(i+"!="+ji);
//          sum+=ji;
//          i+=4;
//      }
//      System.out.println(sum);
        /**
         * 求100以内7的倍数的个数以及和
         */
//        int i = 1;
//        int count =0;//7的个数
//        int sum = 0;//所有7的倍数之和
//        while (i<=100){
//            if(i%7==0){
//                count++;
//                sum+=i;
//            }
//            i++;
//        }
//        System.out.println(count);
//        System.out.println(sum);
        /**
         * 求100-1000以内的水仙花数
         */
//        int i = 100;
//        while (i<1000){
//            int baiWei = i/100;
//            int shiWei = i/10%10;
//            int geWei  = i%10%10;
//            if(baiWei*baiWei*baiWei+shiWei*shiWei*shiWei+geWei*geWei*geWei==i){
//                System.out.println(i+"是水仙花数");
//            }
//            i++;
//        }
        /**
         * 年利率为5%，求1000增长到5000需要多少年
         */
        double money = 1000;
        int year = 0;
        // 第一种写法
//        while (money<=5000){
//            money = money+money*0.05;
//            year++;
//        }
//        System.out.println(year);
        while (true){
            money=money+money*0.05;
            year++;
            if(money>=5000){
                break;
            }
        }
        System.out.println(year);
    }
}
