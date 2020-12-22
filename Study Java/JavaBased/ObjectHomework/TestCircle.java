package ObjectHomework;

public class TestCircle {
    public static void main(String[] args) {
        Point point = new Point();
        point.x = 3.0f;
        point.y = 4.0f;
//        System.out.println(point);
//        System.out.println(point.toString());//打印对象时，会默认调用对象.toString()
        point.print();
        Circle circle = new Circle();
        circle.center = point;
        circle.radius=10;
        circle.Print();
    }
}
