 package GetConstructorInformation;

import java.lang.reflect.Constructor;

public class getConstructorMethods {
    public static void main(String[] args) throws Exception {
        //获取字节码文件对象
        Class clazz = Class.forName("GetConstructorInformation.Persons");
        //获取空参构造方法对象(空参需要为公共方法)
//        Constructor constructor = clazz.getConstructor();
        //通过构造方法的对象来创建学生类对象
//        Object obj = constructor.newInstance();
//        Student student = (Student) constructor.newInstance();
//        System.out.println(student);
//        System.out.println(obj);
        //获取有一个和String类型空参的构造方法对象
//        Constructor constructorString = clazz.getConstructor(String.class);
//        Student studentName = (Student) constructorString.newInstance("tom");
//        System.out.println(studentName);
//        //获取有一个int类型参数的构造方法对象
//        Constructor constructorInt = clazz.getConstructor(int.class);
//        Student studentIntAge = (Student) constructorInt.newInstance(18);
//        System.out.println(studentIntAge);
//        //获取两个类型参数的构造方法对象
//        Constructor two = clazz.getConstructor(String.class,int.class);
//        Student twoPara = (Student) two.newInstance("jack",20);
//        System.out.println(twoPara);

        //获取所有的公共构造方法
        Constructor[] constructors = clazz.getConstructors();
        for (Constructor c : constructors) {
            System.out.println(c);
        }
    }
}

class Persons {
    private String name;
    private int age;

    public Persons() {
    }

    public Persons(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    public Persons(int age) {
        this.age = age;
    }

    public Persons(String name, int age) {
        this.age = age;
        this.name = name;
    }
}
