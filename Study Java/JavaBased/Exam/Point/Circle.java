package Exam.Point;

public class Circle implements IDraw {
    Point center;
    int r;

    @Override
    public void draw() {
        if (center != null) {
            System.out.println("圆心为:(" + center.getX() + "," + center.getY() + "),半径为：" + r + "cm");
        } else {
            System.out.println("圆心未设置");
        }
    }
}
