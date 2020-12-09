package EmployeeObject;

public class Customer {
    public static void main(String[] args) {
        Employee employee = new Employee();
        int age = 26;
        employee.setName("jack");
        employee.setWorkNumber("employee-001");
        employee.setAge(age);
        employee.setSalary(1000F);
        employee.setSex("女");
        System.out.println("我是"+employee.name+","+"工号为:"+employee.workNumber+","+"今年"+employee.age+"岁," +
                ""+"性别"+employee.sex+","+"我的薪资为:￥"+employee.salary+","+employee.Identify(employee.salary));
    }
}
