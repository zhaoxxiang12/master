package ObjectHomework2;

public class Test {
    public static void main(String[] args) {
        Point start = new Point(10, 10);
        Plain plainRect = new Plain(10, 20, start);
        double area = plainRect.area();
        System.out.println("矩形的面积:" + area);
        double perimeter = plainRect.perimeter();
        System.out.println("矩形的周长:" + perimeter);
        boolean isInside = plainRect.isInside(26, 13);
        System.out.println("(26,13)" + (isInside ? "在" : "不在" + "矩形中"));

        Point point = new Point(15,5); // 任意点
        boolean flag =plainRect.isInside(point);
        System.out.println(point+((flag ? "在" : "不在") + "矩形中"));
    }
}
