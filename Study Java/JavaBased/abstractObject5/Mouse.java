package abstractObject5;

/**
 * 鼠标
 */
public class Mouse implements USB {

    public void start(){
        System.out.println("鼠标驱动正在启动");
    }

    public void stop(){
        System.out.println("鼠标驱动正在关闭");
    }

    @Override
    public void run() {

    }
}
