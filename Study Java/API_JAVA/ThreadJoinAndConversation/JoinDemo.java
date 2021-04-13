package ThreadJoinAndConversation;

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
                    if (i == 50) {
                        t1.start(); //线程就绪(有资格但没有权力执行)
                        try {
                            t1.join(); //插入作用：自动调用wait(),让父线程t2停止等待,等待t1全部执行完成后才会让父线程t2继续执行
                            //t1.join(10); //加入线程只会加入10ms时间，时间一到则又执行以前的线程
                        } catch (InterruptedException e) {//中断异常
                            e.printStackTrace();
                        }
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
        t2.start();

    }
}
