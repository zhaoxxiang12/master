package DatePackage;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateDemo {
    public static void main(String[] args) {
        //1.创建一个当前日期
        Date date = new Date();
        System.out.println(date); //东八区GMT+8

        //2.日期格式化工具
        SimpleDateFormat  sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss E");
        String time = sdf.format(date); // format：将日期类型格式化字符串
        System.out.println(time);
        // 3.将字符串格式化成日期 方法：parse 解析
        String time2 = "2008/12/12 12:12:12";
        SimpleDateFormat  sdf2 = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        try{
            Date parseDate=sdf2.parse(time2);
            System.out.println(parseDate);
        } catch (ParseException e){
            System.out.println("日期解析错误");
        }
    }
}
