package Exam.Object;

/**
 * 推拉门
 */
public class PushDoor extends Door {
    public PushDoor(String name, String type) {
        super(name, type);

    }

    @Override
    public void close() {
        System.out.println("推拉门关门");
    }

    @Override
    public void open() {
        System.out.println("推拉门开门");
    }
}
