package ThreadWork;

public class TestShop {
    public static void main(String[] args) {
        //1.创建三个线程来模拟三个消费者
        Shopping shopping = new Shopping();

        Thread t1 = new Thread("赵云") {
            @Override
            public void run() {
                shopping.sale();
            }
        };
        Thread t2 = new Thread("关羽") {
            @Override
            public void run() {
                shopping.sale();
            }
        };
        Thread t3 = new Thread("吕布") {
            @Override
            public void run() {
                shopping.sale();
            }
        };
        t1.start();
        t2.start();
        t3.start();
    }
}
