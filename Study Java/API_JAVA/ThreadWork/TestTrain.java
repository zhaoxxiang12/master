package ThreadWork;

public class TestTrain {
    public static void main(String[] args) {
        Hole hole = new Hole("海底隧道");
        Train t1 = new Train("动车D",hole);
        Train t2 = new Train("高铁G",hole);
        Train t3 = new Train("直达车Z",hole);
        Train t4 = new Train("绿皮车",hole);
        Train t5 = new Train("普快K",hole);

        t1.start();
        t2.start();
        t3.start();
        t4.start();
        t5.start();
    }
}
