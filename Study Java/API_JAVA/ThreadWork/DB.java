package ThreadWork;

/**
 * 实现功能：每次调用add，都将序号自增1
 */
public class DB {
    private int number = 1;

    public void add() {
        System.out.println("序号:" + number);
        number++;
    }
}
