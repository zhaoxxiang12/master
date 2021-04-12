package ThredSecurity;

/**
 * 打印机
 * 线程不安全现象(指令重排导致)
 * 【同步】:保留整体
 *
 *锁:Java中的任意对象都会自带锁
 */
public class Printer {
    public void printA() {
        synchronized (this) { //同步代码块：保证代码块中的完整性
            System.out.print("A");
            System.out.print("A");
            System.out.print("A");
            System.out.print("A"); //会出现指令重排现象
            System.out.println("A");

        }
    }

    public void printB() {
        System.out.print("B");
        System.out.print("B");
        System.out.print("B");
        System.out.print("B");
        System.out.println("B");
    }
}
