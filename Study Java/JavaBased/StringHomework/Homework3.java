package StringHomework;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;
import java.util.zip.DataFormatException;

public class Homework3 {
    /**
     * 控制台输入特定的日期格式并进行拆分日期
     * 如：输入一个日期月日XXXX年 经过处理得到：XXXX年月日
     */
    public static void main(String[] args) throws ParseException {
        Scanner sc = new Scanner(System.in);
        while (true) {
            System.out.println("输入一个日期：格式为月日XXXX年");
            String time = sc.nextLine();
            SimpleDateFormat sdf1 = new SimpleDateFormat("MM月dd日yyyy年");
            try {
                Date date = sdf1.parse(time);// 将字符串解析成对象
                SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy年MM月dd日");
                String formatDate = sdf2.format(date);
                System.out.println("输入的日期是" + time + ",格式化结果是" + formatDate);
                break;
            } catch (ParseException e) {
                System.out.println("日期格式有误");
            }

        }
        sc.close();
    }


}
