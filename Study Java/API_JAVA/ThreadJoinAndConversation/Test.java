package ThreadJoinAndConversation;

public class Test {
    public static void main(String[] args) {
        Print print = new Print();
        Thread t1 = new Thread("线程1") {
            @Override
            public void run() {
                for (int i = 0; i < 100; i++) {
                    try {
                        print.printA();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        };
        Thread t2 = new Thread("线程2") {
            @Override
            public void run() {
                for (int i = 0; i < 100; i++) {
                    try {
                        print.printContent();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        };
        t1.start();
        t2.start();
    }
}