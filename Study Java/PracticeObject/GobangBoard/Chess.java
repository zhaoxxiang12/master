package GobangBoard;

import javafx.scene.paint.Color;

/**
 * 棋子描述类
 */
public class Chess {
    private int x;
    private int y;
    private Color color;
    public Chess (){

    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public Chess(int x, int y, Color color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }
}
