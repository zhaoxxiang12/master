package ThredSecurity;

public class NumberIncrement {
    private static int i = 0;

    public  void increment() {
        ++i;
        System.out.println(Thread.currentThread().getName()+i);
        try {
            Thread.sleep(10);
        } catch (InterruptedException e) {
            e.printStackTrace();
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
