package ThreadRunnable;

public class Test {
    public static void main(String[] args) {
        //1.创建一个
        MyRunnable target = new MyRunnable();
        Thread thread = new Thread();
        thread.start();

    }
}
