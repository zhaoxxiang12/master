package ObjectInheritance;

public class TestRect {
    public static void main(String[] args) {
        Rect rect =new Rect(2.5,3);
       double area =rect.area();
       double perimeter =rect.perimeter();
       System.out.println(area);
       System.out.println(perimeter);

    }
}
