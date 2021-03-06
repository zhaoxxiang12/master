package javaDate;

public class work7 {
    public static final float PI = 3.1415f;
    public static void main(String[] args) {
        String result = String.format("圆周率:%f",PI);
        System.out.println(result);

        float percent=0.67f;
        String format = String.format("百分比n:%f%%",percent*100);
        System.out.println(format);

        float price = 9.88f;
        String format2 = String.format("单价为:%.1f",price);
        System.out.println(format2);


    }
}
