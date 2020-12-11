package doWhileCycle;

public class Keyword {
    /**
     *
     * 改变程序流向的关键字
     */
    public static void main(String[] args) throws InterruptedException {
        // return 关键字
//        System.out.println(111);
//        int i =0;
//        if(i==0){
//            return; // 直接返回方法 改变程序流程顺序结构
//        }
//        System.out.println(2222);

        // break关键字 1.可以结束开关语句 （switch case）
        // 2.结束当前最近的循环（一层循环）
        // 3.break 只能使用在switch 或循环中 不能单独使用在if....else....
        /**
         * 答应10以内的奇数（偶数跳过本次循环进入下次循环，奇数直接打印
         * continue 跳过本次循环进入下次循环
         */
//        int i = 1;
//        while (i<10){
//            if(i%2==0){
//                i++; //针对于偶数来处理循环变量更新
//                continue;//跳过本次循环进入下次循环
//            }
//            System.out.println(i);
//            i++; // 针对奇数来处理循环变量更新
//        }
        // 生活案例 除了电梯 4L 14L其他楼层都会停
        int floor = 1;
        while (floor<=18){
            if(floor==4 || floor==14){
                floor++;
                continue;
            }
            System.out.println(floor);
//            Thread.sleep(3000);// 模拟停靠时间
            floor++;
        }

    }
}
