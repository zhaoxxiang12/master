package ThredSecurity;

/**
 * 表示获取字节码对象NumberIncrement.class
 * 字节码对象是唯一的(当锁使用)
 * 口诀：无论什么方法或者代码块，使用字节码当锁对象一定是正确的
 */
public class NumberIncrement {
    private static int i = 0;
//    public static final Object obj = new Object(); //锁对象一定要唯一
    public void increment() {
        synchronized (Test.class) { //this 需要慎重使用(与苦难导致锁不唯一)
            ++i;
            System.out.println(Thread.currentThread().getName() + i);
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

//    public static void main(String[] args) {
//        NumberIncrement increment = new NumberIncrement();
//        for (int i = 0; i < 10; i++) {
//            increment.increment();
//        }
//        System.out.println(increment.i);
//
//        NumberIncrement increment2 = new NumberIncrement();
//        for (int i = 0; i < 10; i++) {
//            increment2.increment();
//        }
//        System.out.println(increment2.i);
//    }
}
