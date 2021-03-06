package Exam.Object;

public class Test {
    public static void main(String[] args) {
        PushDoor pushDoor = new PushDoor("东风","2001");
        pushDoor.close();
        pushDoor.open();

        Elevator elevator = new Elevator("三菱","220");
        elevator.close();
        elevator.open();
        elevator.FireAlarm();
        elevator.SmokeAlarm();

        AntiTheft antiTheft = new AntiTheft("金凯旋","电动");
        antiTheft.close();
        antiTheft.open();
        antiTheft.SmokeAlarm();
        antiTheft.FireAlarm();
    }
}
