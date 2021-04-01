package Thread;

public class Test {
        //程序入口（主函数就是一个主线程）
    public static void main(String[] args) {
        //线程类Thread
        //如何获取当前正在运行的线程Thread.currentThread()
        //主线程的启动请求是有JVM自动发送给CPU的(将来需要我们自己创建线程手动去启动)
        System.out.println(Thread.currentThread().getName());//获取当前线程名称

    }
}
