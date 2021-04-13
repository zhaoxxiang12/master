package ThreadWork;

/**
 * 实现功能：每次调用add，都将序号自增1
 *
 * synchronized隐式锁
 * {获取锁 }失去锁
 */
public class DB {
    private int number = 1;

    public void add() {
        synchronized (DB.class) {//获取锁
            System.out.println(Thread.currentThread().getName() + "序号:" + number);
            number++;
        }//释放锁

        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}