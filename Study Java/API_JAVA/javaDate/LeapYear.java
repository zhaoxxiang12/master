package javaDate;

import java.util.GregorianCalendar;

public class LeapYear {
    public static void main(String[] args) {
        // 计算2000-2099的闰年并计算程序执行时间
        long start = System.currentTimeMillis();
        GregorianCalendar year = new GregorianCalendar();
        for (int i= 2000;i<=2099;i++)
            if (year.isLeapYear(i)){
                System.out.println(i+"是闰年"+"\n");
            }
        long end = System.currentTimeMillis();
        System.out.println("执行了:"+(end-start)+"ms");
    }
}
