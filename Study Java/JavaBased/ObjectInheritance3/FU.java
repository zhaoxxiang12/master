package ObjectInheritance3;

public class FU {
    public void info(){
        System.out.println("父类info");
    }
    // 私有方法：只有在不需要在外界访问时，我们的内部来调用
    private  void cc(){
        System.out.println("父类的私有方法");
    }
    void sys(){
        System.out.println("父类的default的方法执行");
    }
}
