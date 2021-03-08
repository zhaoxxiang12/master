package DealAnomaly;

public class Test2 {
    public static void main(String[] args) {
        try {
            Integer.parseInt("123a");
            String str = null;
            System.out.println(str.length());
            System.out.println("------------");
        } catch (ArithmeticException e) {
            System.out.println("算数异常");
        }catch (NullPointerException e){
            System.out.println("空指针异常");
        }catch (NumberFormatException e){
            System.out.println("数字格式错误");
        }catch (Exception e){
            System.out.println("程序出错");
        }
        System.out.println("------------");
    }
    /**
     * 异常捕获机制
     * 一般会将有可能出现异常的代码带入到try中,当程序发生一旦异常时,会封装成一个该类型的异常对象
     * 然后依次根据异常类型进行catch匹配,若匹配到了则会有当前这个catch代码块处理，后序的catch
     * 都不会执行。若都没有匹配到这个异常则最终会交给jvm来处理
     */
}
