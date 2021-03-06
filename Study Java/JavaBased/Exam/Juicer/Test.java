package Exam.Juicer;

public class Test {
    public static void main(String[] args) {
        Juicer juicer = new Juicer("白色","苏泊尔");
        Fruits fruits = new Fruits("苹果");
        Fruits fruits1 = new Fruits("菠萝");
        juicer.squeeze(fruits);
        juicer.squeeze(fruits1);
        juicer.clean();

        Grain grain = new Grain("红豆");
        Grain grain1 = new Grain("黄豆");
        juicer.squeeze(grain);
        juicer.squeeze(grain1);
        juicer.clean();
    }
}
