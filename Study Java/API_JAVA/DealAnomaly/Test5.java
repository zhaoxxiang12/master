package DealAnomaly;

/**
 * 无论try中是否发生异常,finally代码块都会执行
 * 考点:当catch中出现return时,先执行完finally后才会执行return
 */
public class Test5 {
    public static void main(String[] args) {
//        try {
//            int i = 10 / 0;
//        } catch (Exception e) {
//            System.out.println("程序出错");
//            return;
//        } finally {
//            System.out.println("finally");
//        }
        System.out.println(test());
    }

    public static int test() {
        try {
//            int i = 1 / 0;
            int num= 10%3;
            return 1;
        } catch (Exception e) {
            System.out.println("程序出错");
            return 2;
        } finally {
            System.out.println("finally");
            return 3;

        }
//        return 0;
    }
    /**
     * 在执行return前必循执行finally
     */
}
