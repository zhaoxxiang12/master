package practiceReflect;

import java.lang.reflect.Method;
import java.util.ArrayList;

public class practiceReflect {
    public static void main(String[] args) throws Exception{
        //练习1：已知一个ArrayList,泛型String,里面存储了一些元素，使用反射来实现该集合中存储Integer类型的数据
        ArrayList<String> al = new ArrayList<>();
        al.add("aa");
        al.add("bb");
        al.add("cc");
        //使用反射技术
        //获取字节码文件对象
        Class clazz = al.getClass();
        //获取add方法对象
        Method addMethod = clazz.getMethod("add", Object.class);
        //调用add方法对象
        addMethod.invoke(al,123);
        addMethod.invoke(al,456);
        addMethod.invoke(al,789);
        addMethod.invoke(al,true);
        System.out.println(al);
    }
}
