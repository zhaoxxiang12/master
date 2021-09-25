package GetClassInformation;

public class Demo2 {
    public static void main(String[] args) throws Exception{
        //获取字节码文件对象
        Class clazz = Class.forName("GetClassInformation.Pig");
        //创建对象
//        Object object =clazz.newInstance();
//        System.out.println(object);
        Pig pig =(Pig)clazz.newInstance();
        System.out.println(pig);
    }
}
class Pig  {

}
