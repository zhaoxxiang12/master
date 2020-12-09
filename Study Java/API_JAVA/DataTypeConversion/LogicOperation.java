package DataTypeConversion;

public class LogicOperation {
    public static void main(String[] args) {
        // 逻辑运算符  与或非
        /**
         *  与（&&） 事件1 和事件2 同时成立 才会为真
         *  独立的结果都是boolean
         *
         *
         *  1.与事件
         *  一个 & 判断两次
         *  两个 && （短路与）： 当事件1为false 事件2 不会执行
         *
         *  开发中推荐使用短路与
         */
        System.out.println(3 > 5 & 5 < 6);
//        System.out.println(3>5 && 10/0 > 8);  //这个结果会报错  算法结果会优先大于比较运算
        /**
         * 或事件
         * 事件1和事件2 只要有一个成立 结果就为真
         *
         *    |
         *    || 短路或 ： 当事件1 为真时，则事件2 不会执行
         */
//        System.out.println(3<5 |10/0>8); //会报错
        System.out.println(3 < 5 || 10 / 0 > 8);

        /**
         *
         * 非
         *   非真即假   非假即真
         *
         *   ! 优先级 仅次于小括号  要保证感叹号后面的值为Boolean
         *
         */

//        System.out.println(!true);
//        System.out.println(!3>5);  // 会报错
//        System.out.println(!(3>5));

        // 判断闰年的表达式   闰年：四年一闰  百年不闰   四百年一闰

        // 分析 四年一闰（能被四整除）  百年不闰 （不能被100整除）  四百年一闰（能被400整除）
        // 四年一闰（能被四整除）且百年不闰 （不能被100整除） 或者 四百年一闰（能被400整除）
        int year = 2000;
        boolean result = year%4==0 && year%100 !=0 || year %400 ==0;
        System.out.println(result);

    }
}
