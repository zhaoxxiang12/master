package abstractObject3;

/**
 * 多态可以取代方法重载
 * 多态:同一个对象可以表示成多个形态
 *
 * 多态的优势:后期的可维护性大,多性能的扩展是开放的,对源代码是关闭的
 *
 * 代码中的体现:父类变量指向子类对象
 */
public class Juicer {
    private String  brand; // 品牌

    // 榨汁是一种行为
//    public void squeeze(Apple apple){
//        System.out.println(brand+"榨出"+apple.getName()+"汁");
//    }
//    public Juicer(){
//        super();
//    }
    public Juicer(String brand){
        super();
        this.brand = brand;
    }
//    public void squeeze(Pear pear){
//        System.out.println(brand+"榨出"+pear.getName()+"汁");
//    }

    // 榨水果汁
    public void squeeze(Fruits fruits){  // Fruits fruits = apple/pear

        // 一种fruit表现出了多种形态(传入apple,表示苹果;传入pear 就表示梨)
        System.out.println(brand+"榨出"+fruits.getName()+"汁");
    }

}
