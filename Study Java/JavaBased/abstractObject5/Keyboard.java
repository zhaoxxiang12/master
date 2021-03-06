package abstractObject5;

public class Keyboard implements USB {
    @Override
    public void start() {
        System.out.println("键盘驱动正在启动");
    }

    @Override
    public void stop() {
        System.out.println("键盘驱动正在关闭");
    }

    public void run(){
        System.out.println("键盘正常运行");
    }
    }

