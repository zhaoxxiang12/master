package Exam.Point;

public class draw  {

    public static void main(String[] args) {
        Point point = new Point(3,4);
        point.draw();

        Circle circle = new Circle();
        circle.center = point;
        circle.r = 10;
        circle.draw();

    }

}
