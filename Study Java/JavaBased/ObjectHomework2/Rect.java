package ObjectHomework2;

/**
 * 面向对象的三大特性
 * 1.封装：隐藏属性细节。对外提供公开访问的方式
 * 2.继承：多态的前提
 * 3.多态
 * 4.封装：隐藏变量的属性
 */

public class Rect {
    protected double width; // 宽
    protected double height; // 高

    public Rect() {
        super();
        this.height = 10;
        this.width = 10;
    }

    public Rect(double width, double height) {
        this.width = width;
        this.height = height;
    }

    /**
     * 求矩形面积
     */
    public double area() {
        double area = width * height;
        return area;
    }

    /**
     * 求矩形周长
     */
    public double perimeter() {
        double perimeter = (width + height) * 2;
        return perimeter;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeight() {
        return height;
    }

    public double getWidth() {
        return width;
    }
}
