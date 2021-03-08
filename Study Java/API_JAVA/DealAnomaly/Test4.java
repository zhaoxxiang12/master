package DealAnomaly;

public class Test4 {
    /**
     * catch的异常类型一定要从小到大(子类到父类)
     * @param args
     */
    public static void main(String[] args) {
        try {
            Integer.parseInt("123a");
            String str = null;
            System.out.println(str.length());
            System.out.println("------------");
        } catch (Exception e){
            System.out.println("程序出错");
//        } catch (ArithmeticException e) {
//            System.out.println("算数异常");
//        } catch (NullPointerException e) {
//            System.out.println("空指针异常");
//        } catch (NumberFormatException e){
//            System.out.println("数字格式错误");
        }
        System.out.println("------------");

    }
}
