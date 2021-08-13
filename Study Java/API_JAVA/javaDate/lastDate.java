package javaDate;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class lastDate {
    public static void main(String[] args) throws ParseException {
        SimpleDateFormat slf = new SimpleDateFormat("yyy-MM-dd HH:mm:ss");
        Calendar cla = Calendar.getInstance();// 获取当前日期
        cla.add(Calendar.MONTH,-1);
        cla.set(Calendar.DAY_OF_MONTH,1); //设置为1号,当前日期既为本月第一天
        String firstDay = slf.format(cla.getTime());
        Date date = slf.parse(firstDay);
        long time = date.getTime();
//        System.out.println(date.getTime());
        System.out.println(firstDay);
        System.out.println(time);
    }
}
