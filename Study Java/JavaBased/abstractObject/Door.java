package abstractObject;

/**
 * 父类越灵活越好
 * <p>
 * 1.含有抽象方法的类一定是抽象类，但是抽象的方法不一定是抽象类
 * 2.抽象类中即可以有普通方法，又可以有抽象方法，还可以有静态方法
 * 3.抽象类是为了继承而存在的，(若没有继承该类，抽象类将不会被设计出来)
 * 4.抽象类不能直接通过new来创建对象的
 * 抽象类的设计理念：通用的父类模板，不确定的就抽象(共性抽取，不确定行为的就抽象)
 */
public abstract class Door {
    private String brand; //品牌
    private String type; // 型号

    //    public void open() {
//        System.out.println("钥匙开锁");
//    }
//
//    public void close() {
//        System.out.println("用钥匙上锁");
//    }
    public Door() {
        super();
    }

    public Door(String brand, String type) {
        this.brand = brand;
        this.type = type;
    }

    // 没有方法体的方法：抽象方法
    // 什么时候用：当父类不确定子类行为具体是什么的时候，就要求父类不实现此方法，而是交给子类去具体实现
    public abstract void abstractOpen();

    public abstract void abstractClose();

    @Override
    public String toString() {
        return brand + ":" + type;
    }
}
