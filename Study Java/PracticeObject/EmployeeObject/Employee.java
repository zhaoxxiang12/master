package EmployeeObject;

/**
 * 员工Employee  每个员工都有自己的姓名、工号、性别、年龄、薪资，员工可以进行自我介绍
 * 蓝领 5000  白领 10000  金领：20000
 */
public class Employee {

    String name;
    String workNumber;
    String sex;
    int age;
    float salary;

    public Employee() {

    }

    public Employee(String name, String workNumber, String sex, int age, float salary) {
        this.name = name;
        this.workNumber = workNumber;
        this.sex = sex;
        this.age = age;
        this.salary = salary;

    }

    public String getName() {
        return name;
    }

    public String getWorkNumber() {
        return workNumber;
    }

    public String getSex() {
        return sex;
    }

    public int getAge() {
        return age;
    }

    public float getSalary() {
        return salary;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setWorkNumber(String workNumber) {
        this.workNumber = workNumber;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public void setAge(int age) {
        this.age = age;
        if (0<=age && age<18 ){
            System.out.println("你还是成年,无法判断你的薪资");
        }else if(age>=60) {
            System.out.println("你该退休了,不在此判断内");

        }
    }

    public void setSalary(float salary) {
        this.salary = salary;
    }
    public String Identify (float salary){
        if(salary>=20000){
            return "金领";
        }else if(salary>=10000){
            return "白领";
        }else if(salary>=5000){
            return "蓝领";
        }else {
            return "无法判断";
        }
    }
}
