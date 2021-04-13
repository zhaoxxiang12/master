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
      t1.start();
    }
}
