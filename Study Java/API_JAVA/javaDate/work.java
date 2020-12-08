package javaDate;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class work {
    // 获取当前时间并输出时间格式yyy-MM-DD HH：mm：ss
    public static void main(String[] args) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(2020,Calendar.DECEMBER,8, 12,52,23);
        String formatDate = new work().formatDate(calendar.getTime());
        System.out.println(formatDate);
        /**
        *
        * @param date
        * @return
        *
        * */


    }

    public String formatDate(Date date) {
        // 对日期进行格式化操作
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(date);
    }
}
