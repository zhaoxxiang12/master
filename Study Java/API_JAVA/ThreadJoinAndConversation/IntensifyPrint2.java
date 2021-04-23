package ThreadJoinAndConversation;

import java.util.concurrent.locks.ReentrantLock;

/**
 * reentrantLock的优势：可以实现跨代码块锁
 */
public class IntensifyPrint2 {
    private static ReentrantLock reentrantLock = new ReentrantLock(); //保证锁唯一
    public void printA() throws InterruptedException {
        reentrantLock.lock();
        System.out.print("A");
        System.out.print("A");
        System.out.print("A");
        System.out.print("A");
        System.out.print("A\t");
        Thread.sleep(10);
        test();
    }
    public void test() throws InterruptedException {
        System.out.print("欢");
        System.out.print("迎");
        System.out.print("光");
        System.out.println("临");
        Thread.sleep(10);
        reentrantLock.unlock();
    }
    public void printB() throws InterruptedException {
        reentrantLock.lock();
        System.out.print("B");
        System.out.print("B");
        System.out.print("B");
        System.out.print("B");
        System.out.println("B");
        Thread.sleep(10);
        reentrantLock.unlock();
    }
}
