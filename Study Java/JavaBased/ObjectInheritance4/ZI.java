package ObjectInheritance4;


public class ZI extends FU {
    public String  hobby = "玩游戏"; // 子类可以自己做扩展
    public ZI() {
        super(); //父类无参(只有一句且只能出现一句，这这一句还是第一句)
        System.out.println("子类构造方法");
    }
    public ZI(String name){
        super(name); //引用父类的有参构造方法
        System.out.println("引用父类的有参构造方法");
    }
    public void show(){
        // 1.访问当前类的成员变量
        System.out.println(this.hobby);
        //2.调用成员的方法
        this.info();
    }
    public  void info(){
        System.out.println("welcome"+hobby);
    }
}
