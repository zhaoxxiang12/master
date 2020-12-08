package javaDate;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Scanner;

public class LeapYear2 {
    public static void main(String[] args) throws ParseException {
        System.out.println("请输入格式为“****年**月**日”的日期");
        Scanner scan = new Scanner(System.in);
        String str = scan.nextLine();

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
        Date d=sdf.parse(str);
        Calendar c=Calendar.getInstance();
        c.setTime(d);
        int year=c.get(Calendar.YEAR);
        int month =c.get(Calendar.MONTH)+1;
        int week =c.get(Calendar.DAY_OF_WEEK)-1;

        GregorianCalendar g =new GregorianCalendar();
        if(g.isLeapYear(year)){
            System.out.println(year+" 是闰年");
        }else{
            System.out.println(year+" 是平年");
        }

        int month_num =c.getActualMaximum(Calendar.DAY_OF_MONTH);//一个月中最大的天数

        System.out.println("该月有"+month_num+"天，"+"该日是星期"+week);


    }
}

