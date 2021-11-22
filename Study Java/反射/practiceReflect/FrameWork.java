package practiceReflect;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.Properties;

public class FrameWork {
    public static void main(String[] args) throws Exception {
        //加载配置文件
        Properties p = new Properties();
        p.load(FrameWork.class.getClassLoader().getResourceAsStream("反射\\practiceReflect\\name.properties"));
        //获取配置文件中的数据
        String className = p.getProperty("className");
        String methodName = p.getProperty("methodName");
        //获取字节码文件对象
        Class clazz = Class.forName(className);
        //创建对象
        Constructor constructor = clazz.getConstructor();
        Object obj = constructor.newInstance();
        // 获取方法对象
        Method method = clazz.getMethod(methodName);
        //调用方法
        method.invoke(obj);
    }

    public static void aa(String className, String methodName) {

    }
}

class people {
    public people() {

    }

    public void eat() {
        System.out.println("吃饭");
    }

    public void drink() {
        System.out.println("喝酒");
    }
}

class pig {
    public pig() {

    }

    public void sleep() {
        System.out.println("睡觉");
    }
}
