package ObjectEncapsulate;

/**
 * 封装：1.隐藏对象的属性和实现细节  2.只对外部提供公共的访问方式(getXxx获取，setXxx赋值)
 *   访问修饰符
 *   public 所有类  所有包
 * 默认不写：范围（只能在当前类和同包中的其他类使用，其它类中和子类中都不可用）使用不多
 *private 私有的（只有在当前类中可以使用）
 * protected：范围（只能在当前类和同包中的其他类及子类中使用，其他包不可用）
 *
 * 为什么要用get/set？
 * public int age //防止脏数据来篡改原始数据
 *
 */
public class Customer2 {
   private int age;// age为私有变量，只能在当前这个类中使用，所以我们要想在其他类中使用它，就必须在本类中提供一个对外公开的访问方法
    String name;
    protected int sno;
    //通用的set：set  XXX
    public void setAge(int a){ // 当成员变量与局部变量同名时，需要做区分（用关键字this 区分，表示当前类的对象）
        if(a<=0){
            System.out.println("年龄为非法数字");
        }else if(a>0&& a<18){
            System.out.println("非成年人没有薪资");
        }else{
            age = a;
        }
    }
    public int getAge(){//所有的get方法用来获取对象属性
        return age;
    }


}
