package ThreadDeamon;

/**
 * 加入线程join(插队)
 * <p>
 * join()当前线程暂停，等待指定的线程执行结束后，当前线程再继续
 */
public class JoinDemo {
    public static void main(String[] args) {

        Thread t1 = new Thread("线程1") {
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    System.out.println(Thread.currentThread().getName() + ":AAA");
                }
            }
        };

        Thread t2 = new Thread("线程2") {
            @Override
            public void run() {
                for (int i = 1; i <= 100; i++) {
                    if (i == 50) {//如果在这里直接写t1.start()运行情况类似
                        t1.start();
//                        try {
//                            t1.join();
//                        } catch (InterruptedException e) {
//                            e.printStackTrace();
//                        }
                    }
                    System.out.println(Thread.currentThread().getName() + ":" + i);
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                }
            }
        };
//        t1.start();
        t2.start();

    }
}
