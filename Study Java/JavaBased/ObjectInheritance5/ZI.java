package ObjectInheritance5;

public class ZI extends FU {
    int money =100000;
    public void show(){
        int money =666;
        System.out.println(money); // 就近原则
        System.out.println("自己"+this.money);
        System.out.println("父类"+super.money);
        System.out.println("爷"+new FU().money);
    }
}
