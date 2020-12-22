package ObjectEncapsulate;

public class Customer {
   private int age;// age为私有变量，只能在当前这个类中使用，所以我们要想在其他类中使用它，就必须在本类中提供一个对外公开的访问方法
    //通用的set：set  XXX
    public void setAge(int a){
        if(a<=0){
            System.out.println("年龄为非法数字");
        }else{
            age = a;
        }
    }


}
