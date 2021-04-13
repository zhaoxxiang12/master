package ThreadWork;

/**
 * 有三个工人制造33个产品,要求产品批号从1递增到33
 * 1.每个工人其实就是一个独立的线程
 * 2.生产方法
 */
public class Worker extends Thread {
    private static long number = 1L;

    public Worker(String name) {
        super(name);
    }

    @Override
    public void run() {
        while (true) {
            synchronized (Worker.class) {
                if (number > 33) {
                    System.out.println("产品已制造完毕");
                    break;
                }
                Product product = new Product(number++);
                System.out.println(getName() + "成功生产出" + product);
                try {
                    Thread.sleep(100);//模拟每次生产商品的时间
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}