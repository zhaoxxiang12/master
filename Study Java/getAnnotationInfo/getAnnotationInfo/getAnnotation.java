package getAnnotationInfo;

import java.lang.annotation.Annotation;

public class getAnnotation {
    //1.获取类上面的属性值
    //2.获取方法上面的注解的属性值
    //3.获取属性上面的注解的属性值
    public static void main(String[] args) throws Exception {
        //使用反射技术来获取注解上面的属性值：tom，18

        //获取字节码文件对象
        Class clazz = Class.forName("getAnnotationInfo.person");
        //获取类上面的注解对象
        //Annotation annotation = clazz.getAnnotation(getAnnotationInfo.getAnnotationInfo.class);
        getAnnotationInfo getInfo = (getAnnotationInfo) clazz.getAnnotation(getAnnotationInfo.class);
        //获取name和age的属性值
        String name = getInfo.name();
        int age = getInfo.age();
        System.out.println(name);
    }
}

@getAnnotationInfo(name = "tom", age = 18,value = "aaa")
class person {

}