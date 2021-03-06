package ObjectHomework2;

public class Point {
    private int StartX;
    private int StartY;
   public int getStartX(){
       return StartX;
   }

    public int getStartY() {
        return StartY;
    }

    public void setStartX(int startX) {
        StartX = startX;
    }

    public void setStartY(int startY) {
        StartY = startY;
    }
    public Point(int startX,int startY){
       super();
       this.StartX = startX;
       this.StartY = startY;
    }
    // 重写Object的toString方法来输出自己想要的结果
    @Override //注解 强制检查是否是重写方法
    public  String toString(){
       return "点("+StartX+","+StartY+")";
    }
}
