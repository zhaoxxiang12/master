package Message;

import java.io.Serializable;

public class ChessMessage implements Serializable {
    private int x;
    private int y;
    private boolean isBlack;
    public ChessMessage(){

    }

    public ChessMessage(int x, int y, boolean isBlack) {
        this.x = x;
        this.y = y;
        this.isBlack = isBlack;
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

    @Override
    public String toString() {
        return "ChessMessage{" +
                "x=" + x +
                ", y=" + y +
                ", isBlack=" + isBlack +
                '}';
    }

    public void setY(int y) {
        this.y = y;
    }

    public boolean isBlack() {
        return isBlack;
    }

    public void setBlack(boolean black) {
        isBlack = black;
    }
}
