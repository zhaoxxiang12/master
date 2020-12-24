package ObjectInheritance;

/**
 * 继承的语法class extends 父类
 *
 * Teacher ：子类
 * Employee:父类 Teacher的父类
 */
public class Teacher extends Employee { //老师类继承员工类
    public void teaching(){
        System.out.println("讲课");
    }
}
