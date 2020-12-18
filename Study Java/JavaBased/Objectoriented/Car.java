package Objectoriented;

public class Car { // 只有主类才可以用public 修饰   并且主类名需要与文件名保持一致
    String brand = "宝马";
    String color = "黑色";
    int price = 3200000;
    String kind = "525";


    public void driving() {
        System.out.println("行驶");
    }

    public void speedUp() {
        System.out.println("加速");
    }

    public void brake() {
        System.out.println("刹车");
    }

}
