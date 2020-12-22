package Objectoriented;

/**
 * 计算器类
 * 属性  品牌  类型 四则运算
 */

//  成员：类的方法
public class Calculator {
    String brand = "卡西欧";
    String type = "科学计算器";

    // 运算
    public void add(int a, int b) {//a,b叫形式参数，用来接收参数
        int sum = a + b;
        System.out.println(a + "+" + b + "=" + sum);

    }

    public void reduction(double a, double b) {
        double result = a - b;
        System.out.println(a + "-" + b + "=" + result);

    }

    public void multiplication(int a, int b) {
        int result = a * b;
        System.out.println(a + "*" + b + "=" + result);
    }

    public void division(double a, double b) {
        double result = a / b;
        System.out.println(a + "/" + b + "=" + result);
    }

    public void sqrt(int x) {
        if (x >= 0) {
            double result = Math.sqrt(x); // 返回double类型的值，那么我们就必须使用double类型的变量去接收它
            System.out.println(x + "开方后的结果是：" + result);
        } else {
            System.out.println("负数无法开方");
        }
    }

    public void power(double x, double y) {
        // 求次方
        double result = Math.pow(x, y);
        System.out.println(x + "^" + y + "=" + result);

    }

    public void createRandom() {
        System.out.println(Math.random());//[0,1)左闭右开区间
    }

    public void intRandom() {
        int num = (int) (Math.random() * 10 + 1);
        System.out.println(num);
    }

    public void minRandom() {
        int num = (int) (Math.random() * 3 + 1);
        System.out.println(num);
    }
    public  void test(){
        System.out.println(Math.ceil(1.2));//向上取整
        System.out.println(Math.floor(1.2));//向下取整 (类似int强转)
    }
    public void verify(){//验证码6位数，字母组成

    }
}