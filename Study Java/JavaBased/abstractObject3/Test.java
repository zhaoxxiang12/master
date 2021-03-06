package abstractObject3;

/**
 * 向上转型绝对安全
 *
 * 多态存在的三个必要条件
 * 1.存在子父类关系
 * 2.存在方法重写
 * 3.父类变量指向子类对象
 */
public class Test {
    public static void main(String[] args) {
        // 1.准备一台榨汁机
        Juicer juicer = new Juicer("九阳");

        // 2.准备苹果
//        Apple apple = new Apple("红富士苹果");
        Fruits apple = new Apple("红富士苹果");  // 向上转型(小范围可以向大范围自动转型)
        juicer.squeeze(apple);
        // 准备梨
//        Pear pear = new Pear("凤梨");
        Fruits pear = new Pear("凤梨");
        juicer.squeeze(pear);
    }
}
