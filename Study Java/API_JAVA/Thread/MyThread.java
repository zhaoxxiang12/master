package Thread;

/**
 * 自定义线程的创建步骤
 * 1.class extends Thread
 * 2.重写run()方法【线程功能执行的核心方法】
 */
public class MyThread extends Thread {

    public MyThread(){
        super();
    }
    public MyThread(String name){
        super(name); //默认调用了Thread中的public Thread(String args){}
    }
    @Override
    public void run() {
        //自定义线程执行的核心方法
        for (int i = 0;i<100;i++){
//            System.out.println(Thread.currentThread().getName()+":AAA");
            System.out.println(super.getName()+":AAA");
        }
    }
}
