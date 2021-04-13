package ThreadDeamon;

/**
 * 守护线程
 * JVM的垃圾回收器GC就是一个守护线程
 */
public class DeamonDemo {
    public static void main(String[] args) {
      Thread t1 =   new Thread("线程1"){
            @Override
            public void run() {
                for (int i = 0; i < 30; i++) {
                    System.out.println("AAAAAA");
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        };
        Thread t2 =   new Thread("线程2"){
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    System.out.println("守护线程");
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        };
        t1.start();
        t2.start();
        t2.setDaemon(true);
    }
}
