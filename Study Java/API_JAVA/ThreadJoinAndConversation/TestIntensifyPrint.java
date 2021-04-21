package ThreadJoinAndConversation;

public class TestIntensifyPrint {
    public static void main(String[] args) {
        IntensifyPrint print = new IntensifyPrint();
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
                        print.printB();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        };

        Thread t3 = new Thread ("线程3"){
            @Override
            public void run() {
                for (int i =0;i<100;i++){
                    try{
                        print.printC();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        };
        t1.start();
        t2.start();
        t3.start();
    }
}
