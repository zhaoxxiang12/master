package abstractObject2;

/**
 * extends:继承
 * implements:实现某个方法
 */

public class liftDoor extends Door implements InterfaceFireAlarm {
    public liftDoor(String brand, String type) {
        super(brand, type);
    }

    @Override
    public void abstractOpen() {
        System.out.println("电梯门按开关打开");
    }

    @Override
    public void abstractClose() {
        System.out.println("电梯门按开关关闭");
    }

    public liftDoor() {
        super();
    }

    @Override
    public void FireAlarm() {
        System.out.println("电梯门遇明火报警");
    }
}
