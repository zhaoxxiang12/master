package Thread;

public class ThreadRun {
    public static void main(String[] args) {
        //因为主线程的优先级默认高于一切其他线程,所以CPU会优先考虑主线程
        //1.创建自定义线程对象
//        MyThread t1 = new MyThread();
        MyThread t1 = new MyThread("三儿");
        //调用对象的普通方法(并没有开启线程)
//        myThread.run();
//        t1.setName("三儿");
        t1.start();//启动新线程(就绪状态)

        for (int i= 0;i<100;i++){
            System.out.println(Thread.currentThread().getName()+":BBB");
        }

//        MyThread t2 = new MyThread();
        MyThread t2 = new MyThread("四儿");
//        t2.setName("四儿");
        t2.start();
        //线程默认名字 thread-0~N
        //JDK 默认采用抢占调度(同一优先级,线程的执行权都是有CPU随机分配)
    }
}
