package EncapsulateIncrease;

/**
 * 创建一个类的时候，当存在有参构造方法时，一定要创建它的无参构造方法
 */
public class Student {
    private String name;
    private int age;

    /**
     * public Student() {
     * super();  // 所有构造方法的第一句都是super()来表示调用父类构造来创建自己（先有父类后有子类，父类创建子类）
     * // super()可以省略不写，但是为了面向对象完整性，建议大家以后都写
     * System.out.println("无参构造方法执行");
     * <p>
     * }
     */
    public Student() {
        super();
    }

    public Student(String name) { // 有参构造方法来注入属性：给属性赋值
        super();
        this.name = name;
    }

    public Student(String name, int age) {
        super();
        this.name = name;
        this.age = age;
    }

    // 通过set来注入属性值
    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getAge() {
        return age;
    }


}
