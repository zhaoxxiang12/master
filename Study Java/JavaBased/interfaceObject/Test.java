package interfaceObject;

public class Test {
    public static void main(String[] args) {
        // 特性1:接口不能被直接实例化  特性2:接口可以直接使用静态常量和静态方法  语法:接口名.常量  接口名.静态方法
//      MyInterface myInterface =  new MyInterface();
        System.out.println(MyInterface.num);
        MyInterface.stop();
    }
}
