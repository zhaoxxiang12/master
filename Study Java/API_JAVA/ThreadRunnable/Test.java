package ThreadRunnable;

public class Test {
    public static void main(String[] args) {
        //1.创建一个
        Runnable target = new MyRunnable();
        Thread thread = new Thread(target);
        thread.start();

        //2.使用匿名内部类来创建接口类型的对象
      Runnable runnable =   new Runnable(){
            @Override
            public void run() {
                System.out.println("you are welcome");
            }
        };
        Thread t2 = new Thread(runnable);
        t2.start();
    }
}
