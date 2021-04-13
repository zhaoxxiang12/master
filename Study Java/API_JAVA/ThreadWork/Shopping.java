package ThreadWork;

/**
 * 三个人抢购一件商品
 */
public class Shopping {
    private int number = 2;

    public void sale() {
        synchronized (Shopping.class) {
            if (number <= 0) {
                System.out.println("商品已售尽");
            } else {
                System.out.print(Thread.currentThread().getName() + "购买到1件商品,");
                number--;
                System.out.println("还剩" + number + "件商品");
            }
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}