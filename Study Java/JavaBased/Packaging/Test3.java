package Packaging;

public class Test3 {
    public static void main(String[] args) {
        Integer num = new Integer(102);
        Integer num2 = new Integer(102);
        int num3 = num;
        System.out.println(num == num2);  // 比较地址 false
        System.out.println(num ==num3);  // num 为包装类型 == num3 为基本类型(包装类型会自动拆箱成基本类型) true
    }
}
