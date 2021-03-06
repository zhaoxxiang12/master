package Exam.Object;

/**
 * 电梯门
 */
public class Elevator extends Door implements MultiTest {
    public Elevator(String name, String type) {
        super(name, type);
    }

    @Override
    public void close() {
        System.out.println("电梯门自动关门");
    }

    @Override
    public void open() {
        System.out.println("电梯门自动开门");
    }

    @Override
    public void FireAlarm() {
        System.out.println("电梯门遇火告警");
    }

    @Override
    public void SmokeAlarm() {
        System.out.println("电梯门烟感告警");
    }
}
