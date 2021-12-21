package getAnnotationInfo;

import java.lang.reflect.Field;

public class demo3 {
    public static void main(String[] args) throws Exception {
        //获取字节码文件对象
        Class clazz = Class.forName("getAnnotationInfo.C");

        //获取name属性对象
       Field field = clazz.getDeclaredField("name");
       //获取name属性上的注解对象
        getAnnotationInfo gai = field.getAnnotation(getAnnotationInfo.class);
        //获取name和age属性值
        String name = gai.name();
        int age = gai.age();
        String value = gai.value();
        System.out.println(name + "..."+age + "..." +value);
    }
}

class C {
    @getAnnotationInfo(name = "rose", age = 20, value = "jack")
    private String name;
}