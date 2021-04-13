package ThreadWork;

public class TestDB {
    public static void main(String[] args) {
        DB db = new DB();
        Thread t1 = new Thread() {
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    db.add();
                }
            }
        };
        Thread t2 = new Thread() {
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    db.add();
                }
            }
        };
        t1.start();
        t2.start();
      // 什么时候会出现线程安全问题:什么情况下才会产生并发(多个线程访问了同一个资源而出现的竞争现象)
    }
}
