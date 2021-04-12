package ThredSecurity;

public class Test {
    public static void main(String[] args) {
        NumberIncrement number = new NumberIncrement();
        Thread t1 = new Thread("A:") {
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    number.increment();
                }
            }
        };
        Thread t2 = new Thread("B:") {
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    number.increment();
                }
            }
        };
        t1.start();
        t2.start();
    }
}
