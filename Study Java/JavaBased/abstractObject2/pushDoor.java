package abstractObject2;

/**
 * class implements InterfaceFireAlarm, InterfaceMonitor java是单继承多实现(类是单继承,多实现的)
 *
 * Java中存在子父类关系的是:继承关系  实现关系
 */

//public class pushDoor extends Door implements InterfaceFireAlarm, InterfaceMonitor {
public class pushDoor extends Door implements InterfaceMultiAlarm{  // 使用一个接口类,实现了多个功能
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

    @Override
    public void FireAlarm() {
        System.out.println("推拉门遇到任何火都报警");
    }

    @Override
    public void Monitor() {
        System.out.println("推拉门具有视频监控功能");
    }
}
