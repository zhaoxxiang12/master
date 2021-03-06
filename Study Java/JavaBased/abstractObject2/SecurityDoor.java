package abstractObject2;

/**
 * 抽象类:可以作为一个模板，一改全改
 *
 * 防盗门具备了防火报警功能
 */


public class SecurityDoor extends Door implements InterfaceFireAlarm {
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

    @Override
    public void FireAlarm(){
        System.out.println("防盗门烧到指纹识别装置报警");
    }
}
