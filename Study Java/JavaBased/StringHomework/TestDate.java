package StringHomework;

import java.util.Date;

public class TestDate {
    public static void main(String[] args) {
        Homework6_DateUtil homework6_dateUtil = new Homework6_DateUtil();
        Date date = homework6_dateUtil.getDate(2020, 12, 12);
        Date date2 = homework6_dateUtil.getDate(2020, 11, 12, 12, 12, 12);
        Date date3 = homework6_dateUtil.getDate(2020, 10, 01);

        String format = homework6_dateUtil.format(date2);
        String format2 = homework6_dateUtil.format(date3);
        System.out.println(format);
        System.out.println(format2);

        //时间
        Date time = homework6_dateUtil.getTime(12, 12, 12);
        String formatTime = homework6_dateUtil.format(time);
        System.out.println(formatTime);
    }
}
