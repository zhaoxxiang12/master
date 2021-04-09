package Thread;

public class Test2 {
    public static void main(String[] args) {
        //1.使用匿名来创建线程
        Thread thread = new Thread() {
            @Override
            public void run() {
                for (int i = 1; i <= 9; i++) {
                    System.out.println(i);
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    } ;//休眠线程(延时,单位毫秒)
                }
            }
        };
        thread.start();
    }
}
