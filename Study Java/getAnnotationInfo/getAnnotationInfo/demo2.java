package getAnnotationInfo;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;

public class demo2 {
    public static void main(String[] args) throws Exception {
        //获取字节码文件对象
        Class clazz = Class.forName("getAnnotationInfo.B");

        //获取show方法对象
        Method method = clazz.getMethod("show");
        //获取方法上的注解对象
        getAnnotationInfo annotation = method.getAnnotation(getAnnotationInfo.class);
        //获取name和age的属性值
        String name = annotation.name();
        int age = annotation.age();
        annotation.value();
        System.out.println(name+"..."+age);
    }
}

class B {
    @getAnnotationInfo(name = "jerry", age = 18,value = "bbb")
    public void show() {

    }
}
