package abstractObject;

/**
 * 1.一个类继承了抽象类并没有重写里面【所有的抽象方法】那么这个类就需要继续抽象下去
 * 2.使用抽象类时需要子类重写全部的重写方法
 */
public class pushDoor extends Door {
    public pushDoor() {
        super();
    }

    public pushDoor(String brand, String type) {
        super(brand, type);  // 通过子类向父类的构造传参
    }

    @Override
    public void abstractClose() {
        System.out.println("拉上推拉门");
    }

    @Override
    public void abstractOpen() {
        System.out.println("推开推拉门");
    }
}
