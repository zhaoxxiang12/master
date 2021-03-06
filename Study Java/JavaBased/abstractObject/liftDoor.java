package abstractObject;

/**
 * 抽象类子类需要重写父类所有方法
 */
public class liftDoor extends Door {
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
}
