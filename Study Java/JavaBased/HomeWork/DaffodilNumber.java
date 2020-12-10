package HomeWork;

public class DaffodilNumber {
    public static void main(String[] args) {
        // 判断某个数是否是水仙花数
//        int number = 153;
//        int baiWei = number/100;
//        int shiWei = number /10%10;
//        int gewWei = number %10%10;
//        if (shiWei*shiWei*shiWei + baiWei*baiWei*baiWei+gewWei*gewWei*gewWei==number){
//            System.out.println("是水仙花数");
//        }else {
//            System.out.println("不是水仙花数");
//        }
        /**
         *
         * 判断  100 - 999内哪些是水仙花数
         */
//        for(int number = 100;number<=999;number++){
//            int baiWei = number/100;
//        int shiWei = number /10%10;
//        int gewWei = number %10%10;
//        if (shiWei*shiWei*shiWei + baiWei*baiWei*baiWei+gewWei*gewWei*gewWei==number){
//            System.out.println(number+"是水仙花数");
//        }
//
//        }

        /**
         *
         * 商品价格 16.8  会员 88折，计算折后价
         */
//        float StorePrice = 16.8F;
//        float discountPrice = 88F / 100;
//        float finalPrice = StorePrice * discountPrice;
//        StorePrice = StorePrice * discountPrice; // 将计算后的值再赋值给StorePrice
//        String newPrice = String.format("%.2f",StorePrice);  //保留小数点后两位
//        System.out.println(finalPrice);
//        System.out.println(StorePrice);
//        System.out.println(newPrice);

        /**
         * 复合赋值运算符
         *  不能常量赋值给常量
         *  short  byte 容易产生溢出
         *
         */

//        int b= 10;
//        System.out.println(b++);
//        System.out.println(b++);
//        System.out.println(b);

        byte a =1;
        int b =10;
        a +=b;
        System.out.println(a);

        short num = 10;
//        num = num +1;  //写法错误， 1是int int转short会存在损失 同 short s = num +1；
        num+=1; //等效于 num = (short)(num+1)

        int x = 10;
        System.out.println(x+=5); //等效于x= (int)(x+5)
    }
}
