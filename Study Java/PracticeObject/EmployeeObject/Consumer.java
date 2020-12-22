package EmployeeObject;

import java.util.Date; //日期类工具

/**
 *方法的重载
 * 前提：在同一个类中
 * 要点：1).同名（方法名相同），同参（参数列表不同：1.参数类型不同（类型相同会报错）2.参数的个数不同 3.参数的顺序不同）
 * 2).与方法返回值无关
 *构造方法是典型的方法重载  普通的方法也可以重载
 *
 * 对象的属性赋值有两种形式   1.构造方法  2.setXxx
 *
 */
public class Consumer {
    // 属性私有化 1.id  name sex  age(birthday)
    private long id;
    private String name;
    private char sex;
    private int age;
    private Date birthday;
    private int cno;

    // 2.无参数构造方法
    public Consumer(){
        super(); //1.super()表示父类构造方法，所有类的父类都是Object2
        // Java 的所有对象都是由Object 来创建的
        System.out.println("无参构造方法执行");
    }
    public Consumer(long id,String name,char sex,int age,Date birthday){ // 全参构造方法
        super();//创建并初始化对象
        this.id = id;
        this.name = name;//覆盖name初始值
        this.sex = sex;
        this.age =age;
        this.birthday =birthday;
    }
    public Consumer(long id) {
        super();
        this.id =id;
    }

    public Consumer(int cno){
        super();
        this.cno = cno;
    }







    // 3.提供公共的访问方式get获取，set赋值
    public void setId(long id){
        this.id = id;
    }
    public long getId(){
        return id;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getAge() {
        return age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setSex(char sex) {
        this.sex = sex;
    }

    public char getSex() {
        return sex;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public Date getBirthday() {
        return birthday;
    }

    // 4.普通方法的重载
    public void show(){
        System.out.println(1111);
    }

    public void show(int number){
        System.out.println(2222);
    }



}
