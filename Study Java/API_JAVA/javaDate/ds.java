package javaDate;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class ds {
    public static void main(String[] args) {
        SimpleDateFormat slf = new SimpleDateFormat("yyy-MM-dd HH:mm:ss");
        Calendar cla = Calendar.getInstance();// 获取当前日期
        cla.add(Calendar.MONTH,-1);
        cla.set(Calendar.DAY_OF_MONTH,1); //设置为1号,当前日期既为本月第一天
        String firstDay = slf.format(cla.getTime());
    }
}
