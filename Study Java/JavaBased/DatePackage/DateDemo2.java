package DatePackage;

import java.util.Calendar;
import java.util.Date;

public class DateDemo2 {
    public static void main(String[] args) {
        /**
         * 时间戳
         *      Date date = new Date()  开发中经常使用
         */
        //1.时间戳(从1970.1.1 0：0：0到现在的毫秒数)
        long time = System.currentTimeMillis();
        System.out.println(time);

        // 可以检测程序耗费的时间，测试代码效率
        Date date = new Date(2020,11,23,22,59,00);//出现中划线表示此方法已过时（但是可以使用）
        System.out.println(date);

        //日历类
        Calendar calendar = Calendar.getInstance();
        calendar.set(2020,Calendar.DECEMBER,12,22,59,59); //向日历中设置时间
        Date time3 = calendar.getTime(); // 向日历设置的时间返回
        System.out.println(time3);
    }
}
