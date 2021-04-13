package ThreadWork;

public class TestTrain {
    public static void main(String[] args) {
        Train t1 = new Train("动车D");
        Train t2 = new Train("高铁G");
        Train t3 = new Train("直达车Z");
        Train t4 = new Train("绿皮车");
        Train t5 = new Train("普快K");

        t1.start();
        t2.start();
        t3.start();
        t4.start();
        t5.start();
    }
}
