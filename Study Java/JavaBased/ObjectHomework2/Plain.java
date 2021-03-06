package ObjectHomework2;

public class Plain extends Rect {
    Point start; // 矩形左上角顶点坐标

    public Plain() {
        super();

    }

    public Plain(double width, double height, Point start) {
        super(width, height);// 默认调用父类的构造方法来创建对象
        this.start = start;
    }

    /**
     * 1.判断点是否在矩形内
     *
     * @param point 矩形的任意点
     * @return true 表示在矩形内，false表示在矩形外
     */
    public boolean isInside(Point point) {
        if (point == null) { // 防止空指针出现
            return false;
        }
        double startX = start.getStartX();
        double startY = start.getStartY();
        double x = point.getStartX();
        double y = point.getStartY();
        return (x >= startX && x <= (startX + getWidth()) && y >= (startY-super.getHeight()) && y <= (startY));
    }

    // 方法重载
    public boolean isInside(int x, int y) {
        return isInside(new Point(x,y));
    }
}
