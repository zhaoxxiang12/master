package Thread;

public class Test3 {
    public static void main(String[] args) {
        //创建线程，一个打印A,一个打印B
        Printer p1 = new Printer();

        Thread t1 = new Thread(){
            @Override
            public void run() {
                for (;;){
                    p1.printA();
                    try{
                        Thread.sleep(1000);
                    }catch (InterruptedException e){
                        e.printStackTrace();
                    }
                }
            }
        };
        t1.start();



        Thread t2 = new Thread(){
            @Override
            public void run() {
                for (;;){
                    p1.printB();
                    try{
                        Thread.sleep(1000);
                    }catch (InterruptedException e){
                        e.printStackTrace();
                    }
                }
            }
        };
        t2.start();
    }
}
