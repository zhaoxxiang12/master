package getClassMethod;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;

public class getClassMethod {
    public static void main(String[] args) throws Exception {
        //获取字节码文件对象
        Class clazz = Class.forName("getClassMethod.cat");
        //获取构造方法对象
        Constructor con = clazz.getConstructor();
        //创建对象
        Object obj = con.newInstance();
        //获取无参无返回值方法
        Method noneParamReturnValue = clazz.getMethod("aaa");
        //调用方法
        Object noneReturnValue = noneParamReturnValue.invoke(obj);
        System.out.println("无参无返回值" + noneReturnValue);

        //获取有参无返回值方法对象
        Method hasParamNoValue = clazz.getMethod("BB", String.class);
        Object returnValue = hasParamNoValue.invoke(obj, "你好");
        System.out.println("有参无返回值:" + returnValue);

        //获取无参有返回值方法
        Method noParamHasValue = clazz.getMethod("cc");
        Object noParamReturnValue = noParamHasValue.invoke(obj);
        System.out.println("无参有返回值:" + noParamReturnValue);

        //获取有参有返回值方法
        Method hasParamHasValue = clazz.getDeclaredMethod("dd", int.class);
        Object hasParamReturnValue = hasParamHasValue.invoke(obj, 123);
        System.out.println("有参有返回值:" + hasParamReturnValue);

        //获取所有公共方法
        Method[] methods = clazz.getMethods();
        for (Method method : methods) {
            System.out.println(method);
        }
        //获取私有方法对象
        Method privateMethod = clazz.getDeclaredMethod("ee", String.class);
        privateMethod.setAccessible(true);
        Integer privateMethodValue = (Integer) privateMethod.invoke(obj, "12");
        System.out.println(privateMethodValue);
    }
}

class cat {
    public String name;
    private int age;
    public String sex;

    public String getName() {
        return name;
    }

    public cat() {

    }

    public cat(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    @Override
    public String toString() {
        return "cat{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", sex='" + sex + '\'' +
                '}';
    }

    //无参没有返回值的方法
    public void aaa() {
        System.out.println("aaa");
    }

    //有参无返回值方法
    public void BB(String message) {
        System.out.println(message);
    }

    //无参有返回值方法
    public String cc() {
        return "hello";
    }

    //有参有返回值方法
    public String dd(int i) {
        System.out.println("有参有返回值方法");
        return "hello" + i;
    }

    private int ee(String s) {
        return Integer.parseInt(s);
    }
}
