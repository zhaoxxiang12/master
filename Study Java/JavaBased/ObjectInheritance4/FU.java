package ObjectInheritance4;

/**
 * 构造方法时不能被继承
 */
public class FU {
    private String name;
    public FU() {
        super(); //父类是Object，最终的对象是由Object来创建的 (new 是来帮助我们实现)
        System.out.println("父类构造方法");
    }
    public String getName(){
        return name;
    }
    public FU(String name) {
        super(); //父类是Object，最终的对象是由Object来创建的 (new 是来帮助我们实现)
        this.name =name;
        System.out.println("父类构造方法");
    }
    public void setName(String name){
        this.name =name;
    }
}
