package Objectoriented;

public class ObjectDemo {//类的命名规范，每个首字母大写
    //  属性  姓名 学号 性别 身高等（是什么）
    String  name = "张三";
    int sno = 1001;
    char gender = '男';
    float height = 183.4f;
    float weight = 80;

    //行为  学习  考试 读书 写字（能做什么）
    /**
     * 方法的语法
     * 访问修饰符 方法的返回值  方法名（形参列表）{
     *     // 方法体  方法需要做的事情
     * }
     *
     */

    public  void eat(){
        System.out.println("正在吃饭");
    }
    public  void study(){
        System.out.println("正在学习");
    }
}
