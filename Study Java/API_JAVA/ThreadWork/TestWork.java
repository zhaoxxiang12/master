package ThreadWork;

public class TestWork {
    public static void main(String[] args) {
        Worker worker1 = new Worker("甲员工");
        Worker worker2 = new Worker("乙员工");
        Worker worker3 = new Worker("丙员工");

        worker1.start();
        worker2.start();
        worker3.start();
    }
}
