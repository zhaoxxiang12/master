package ThreadWork;

public class Test {
    public static void main(String[] args) {
        Window window1 = new Window("一号窗口");
        Window window2 = new Window("二号窗口");
        Window window3 = new Window("三号窗口");
        Window window4 = new Window("四号窗口");

        window1.start();
        window2.start();
        window3.start();
        window4.start();
    }
}
