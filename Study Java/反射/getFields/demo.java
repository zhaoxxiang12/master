package getFields;

import java.lang.reflect.Field;

/**
 * public Field getField(String name):获取公共的成员变量
 * public Field [] getFields: 获取所有的公共的成员变量
 *
 * public Field getDeclaredField(String name):获取成员变量
 * public Field [] getDeclaredFields:获取所有的成员变量
 *
 * Field类中的方法
 * public void set(Object obj ,object value):给具体的那个对象赋值
 */
public class demo {
    public static void main(String[] args) throws Exception {
        //获取字节码文件对象
        Class clazz = Class.forName("getFields.dog");

        //创建对象
        Object obj = clazz.newInstance();

        Object obj1 = clazz.newInstance();
        //获取name的成员变量对象
        Field nameField = clazz.getField("name");
        System.out.println(nameField);
        //获取age成员变量
        Field ageField = clazz.getField("age");
        //获取sex成员变量
       Field sexField= clazz.getDeclaredField("sex");
       sexField.setAccessible(true);
        //赋值name
        nameField.set(obj,"tom");
        ageField.set(obj,18);
        sexField.set(obj,"女");
        System.out.println(obj);


        //给obj1对象的name赋值
        nameField.set(obj1,"herry");
        ageField.set(obj1,19);
        sexField.set(obj1,"男");
        System.out.println(obj1);
    }
}

class dog {
    public String name;
    public int age;
    private String sex;

    public dog() {

    }

    @Override
    public String toString() {
        return "dog{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", sex='" + sex + '\'' +
                '}';
    }
}