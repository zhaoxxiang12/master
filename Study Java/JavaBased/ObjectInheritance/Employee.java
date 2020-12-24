package ObjectInheritance;

/**
 * private<default<protected<public
 *
 *  继承的特点：1.共享父类的【非私有】的属性和方法  2.子类可以自己做扩展（子类可以拥有自己的属性和方法）
 *  3.子类可以共享父类的成员  但是父类无法访问子类的属性和方法 成员
 */
public class Employee {
    public String eno; // 工号
    public String name; // 名字
    protected String sex = "女"; // 性别
    public int age; //年龄

   private void show() {
        System.out.println("AAA");
    }
}
