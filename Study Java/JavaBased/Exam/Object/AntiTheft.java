package Exam.Object;

/**
 * 防盗门
 */

public class AntiTheft extends Door implements MultiTest {
    public AntiTheft(String name, String type) {
        super(name, type);
    }

    @Override
    public void close() {
        System.out.println("防盗门手动关上");
    }

    @Override
    public void open() {
        System.out.println("防盗门指纹打开");
    }
    @Override
    public void FireAlarm(){
        System.out.println("防盗门遇火告警");
    }
    @Override
    public void SmokeAlarm(){
        System.out.println("防盗门烟感告警");
    }
}
