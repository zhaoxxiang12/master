package demo;

/**
 * 注解格式
 * 元注解
 * 修饰符 @interface 注解名字{
 *
 * }
 */
public class demo01 {
    public static void main(String[] args) {

    }
}

class Fu {
    public void print() {

    }
}

class Zi extends Fu {
    @Override
    public void print() {
        super.print();
    }
}
