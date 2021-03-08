package DealAnomaly;

/**
 * 通过父类异常Exception 可以捕获子类异常
 */
public class Test3 {
    public static void main(String[] args) {
        try {
            Integer.parseInt("123a");
            String str = null;
            System.out.println(str.length());
            System.out.println("------------");
        }catch (Exception e){
            System.out.println("程序出错");
            e.printStackTrace();
        }
        System.out.println("------------");
    }
}
