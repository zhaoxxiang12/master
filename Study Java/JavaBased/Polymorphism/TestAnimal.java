package Polymorphism;

public class TestAnimal {
    public static void main(String[] args) {
//        Cat cat = new Cat("波斯猫",'母');
//        Dog dog = new Dog("金毛犬",'母');

        // 1.上转型(父类变量可以表示子类对象)
        // 子类→ 父类转型时(上转型); 符合单项is - a 关系的 (绝对安全的,因为存在继承关系)
        Animal cat2 = new Cat("波斯猫",'母');
        Animal dog2 = new Dog("金毛犬",'母');

        // 2.下转型 (父类转子类)
        //ClassCastException 类型转换异常  下转型会出现的异常
        // 解决方案:关键字 instanceof 来进行判断 (判断此对象是否属于这个类型)
//        Animal animal = new Animal("金丝猴",'公');

        Animal animal = new Cat("波斯猫",'母');

        if(animal instanceof Cat ){  // 当条件不满足就不会运行
            Cat cat3 = (Cat)animal;
            System.out.println(cat3);
        }

    }
}
