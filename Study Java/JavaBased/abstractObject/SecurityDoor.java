package abstractObject;

public class SecurityDoor extends Door {
    @Override
    public void abstractOpen() {
        System.out.println("使用指纹打开");
    }

    @Override
    public void abstractClose() {
        System.out.println("直接关闭");
    }

    public SecurityDoor(String brand, String type) {
        super(brand, type);
    }

    public SecurityDoor() {
        super();
    }

}
