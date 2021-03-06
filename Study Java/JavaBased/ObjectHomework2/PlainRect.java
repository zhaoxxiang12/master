package ObjectHomework2;

public class PlainRect extends Rect {
    private double StartX;
    private double StartY;
    public PlainRect(double width, double height, double StartX, double StartY) {
        this.StartX = StartX;
        this.StartY = StartY;
        this.width = width;
        this.height = height;
    }
    public PlainRect(){
        this.StartY =0;
        this.StartX =0;
        this.width = 0;
        this.height = 0;
    }
}


