package ObjectHomework;

public class Employee {
    // 员工名字
    String name;
    //员工薪资
    float salary;
    //员工工号
    String sno;
    // 员工年龄
    int age;
    // 员工性别
    String sex;
    public void info(){
        System.out.println("我叫"+name+"，性别:"+sex+",工号"+sno+"今年"+age+"岁，"+"薪资￥"
                +salary+","+identify(salary));
    }
    public String identify(float salary){
        if(salary>=20000){
            return "金领";
        }else if(salary>=10000&&salary<20000){
            return "白领";
        }else if(salary>5000&&salary<10000){
            return "蓝领";
        }else {
            return ("薪资太低无法判断");
        }
    }
}
