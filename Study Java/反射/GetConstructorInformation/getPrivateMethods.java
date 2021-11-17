package GetConstructorInformation;

import java.lang.reflect.Constructor;

public class getPrivateMethods {
    public static void main(String[] args) throws Exception {
        //获取字节码对象
        Class clazz = Class.forName("GetConstructorInformation.Managers");
        //获取私有的空参构造方法
        Constructor c = clazz.getDeclaredConstructor();
        //取消Java语言访问检查 一般我们传递的参数都是true 暴力反射:使用反射获取私有成员的时候，使用普通对象访问获取不到
        c.setAccessible(true);
        //创建对象
        Managers manager = (Managers) c.newInstance();
        System.out.println(manager);
        //获取所有的构造方法
        Constructor [] constructors = clazz.getDeclaredConstructors();
        for (Constructor constructor:constructors){
            System.out.println(constructor);
        }
    }
}

class Managers {
    private String name;
    private int age;

    private Managers() {
    }

    public Managers(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    public Managers(int age) {
        this.age = age;
    }

    public Managers(String name, int age) {
        this.age = age;
        this.name = name;
    }
}

