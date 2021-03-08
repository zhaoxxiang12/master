package DealAnomaly;

public class Test7 {
    public static void main(String[] args) {
        int age = -10;
        checkAge(age);
    }

    /**
     * 自定义异常extends Exception 在抛出throw 必须在方法上声明throws异常或者内部捕获
     * 自定义异常extends RuntimeException在抛出时无需再方法上声明throws异常(主流方法)
     * @param age
     * @return
     */
    public static boolean checkAge(int age){
        if (age<0 || age>250) {
            throw new AgeException("年龄是非法的"); //抛出自定义异常
        }
        return true;
    }
}
