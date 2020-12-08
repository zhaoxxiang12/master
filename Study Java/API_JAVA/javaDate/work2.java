package javaDate;


import java.util.Calendar;

// 计算2008-2-17 到 2008-3月29日相差多少天
public class work2 {
    public static void main(String[] args) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(2008, Calendar.FEBRUARY, 17);
        long time1 = calendar.getTimeInMillis();
//        System.out.println(time1/1000/60/60/365);
        calendar.set(2008, Calendar.MARCH, 29);
        long time2 = calendar.getTimeInMillis();
//        System.out.println(time1);
//        System.out.println(time2);
        long differenceDays = (time2 - time1) / 1000 / 60 / 60 / 24;
        System.out.println("相差" + differenceDays + "天");
    }

}
