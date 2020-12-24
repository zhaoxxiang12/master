package StringHomework;

import Objectoriented.Calculator;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Homework6_DateUtil {
    /**
     * 定义一个DateUtil 定义两个方法
     * 传入一个日期类型类似于2020-08-09 17:23:00
     * 方法可将字符串解析成日期格式
     * 定义方法入参为year month day hour min second 返回一个日期类型
     *
     */

    /**
     * 1.将日期类型转换成字符串
     *
     * @param date
     * @return
     */
    public String format(Date date) {
        return new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(date);
    }
        //month 的范围是[0,11] 表示1~12月
    public Date getDate(int year, int month, int day, int hour, int min, int second) {

        Calendar calendar = Calendar.getInstance();
        calendar.set(year, month, day, hour, min, second);
        return calendar.getTime();
    }

    public Date getDate(int year, int month, int day) {
        return getDate(year, month, day, 0, 0, 0);
    }
    public Date getTime(int hourOfDay,int minute,int second){
        return getDate(0,0,0,hourOfDay,minute,second);
    }
}
