package ObjectHomework;

public class Circle {
    // 圆心(点)
    Point center; // null  【重要：一个类的对象i作为另一个对象成员的属性】
    //半径
    double radius; //默认为null

    public void Print() {
        if (center != null) {
            System.out.println("圆心为:(" + center.x + "," + center.y + "),半径为：" + radius + "cm");
        } else {
            System.out.println("圆心未设置，请显示设置圆心");
        }
    }
}
