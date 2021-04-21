package ThreadJoinAndConversation;

/**
 * 当有两个以上的线程时，需要唤醒所有线程
 * while 用来唤醒后循环判断flag,只有满足条件才会打印相关内容
 */
public class IntensifyPrint {
    private static int flag = 1; //1：打印A 2：欢迎光临


    public void printA() throws InterruptedException {
        synchronized (this) {
            while (flag != 1) {
                this.wait(); //进入线程池(会释放锁)
            }
            System.out.print("A");
            System.out.print("A");
            System.out.print("A");
            System.out.print("A");
            System.out.println("A");
            flag = 2;
            Thread.sleep(1000);
            this.notifyAll();// 随机唤醒线程等待池中的任意线程(若线程没有线程，则会空唤醒)
        }
    }

    public void printB() throws InterruptedException {
        synchronized (this) {
            while (flag != 2) {
                this.wait();
            }
            System.out.print("B");
            System.out.print("B");
            System.out.print("B");
            System.out.print("B");
            System.out.println("B");
            flag = 3;
            Thread.sleep(1000);
            this.notifyAll();
        }
    }
    public void printC() throws InterruptedException {
        synchronized (this) {
            while (flag != 3) {
                this.wait();
            }
            System.out.print("C");
            System.out.print("C");
            System.out.print("C");
            System.out.print("C");
            System.out.println("C");
            flag = 1;
            Thread.sleep(1000);
            this.notifyAll();
        }
    }
}
