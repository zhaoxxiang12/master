package abstractObject2;

/**
 * 父类变量指向了子类对象(编译看左边  运行看右边)  编译看父类,运行看子类
 * 只能使用父类中的定义方法,子类特有的就不能使用了
 *
 *
 */
public class Test {
    public static void main(String[] args) {
        pushDoor push = new pushDoor();
        push.abstractOpen();

        Door push2 = new pushDoor("东风推拉门","东风21D");
        push2.abstractOpen();

        InterfaceMultiAlarm push3 = new pushDoor();
        push3.FireAlarm();
        push3.Monitor();

    }
}
