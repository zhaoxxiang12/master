package ThreadJoinAndConversation;

/**
 * 线程通信：管理线程的执行顺序
 * 配合synchronized同步锁来使用
 * wait():等待(线程等待池,释放锁)
 * notify():唤醒(随机在线程等待池中唤醒一个线程)
 * 线程执行顺序需要通过第三方变量来控制 int flag
 */
public class Print {
    private static int flag = 1; //1：打印A 2：欢迎光临


    public void printA() throws InterruptedException {
        synchronized (this) {
            if (flag != 1) {
                this.wait(); //进入线程池(会释放锁)
            }
            System.out.print("A");
            System.out.print("A");
            System.out.print("A");
            System.out.print("A");
            System.out.println("A");
            flag = 2;
            Thread.sleep(1000);
        }
    }

    public void printContent() throws InterruptedException {
        synchronized (this) {
            if (flag != 2) {
                this.wait();
            }
            System.out.print("欢");
            System.out.print("迎");
            System.out.print("光");
            System.out.println("临");
            flag = 1;
            Thread.sleep(1000);
        }
    }
}
