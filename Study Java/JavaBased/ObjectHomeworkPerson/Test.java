package ObjectHomeworkPerson;

public class Test {
    public static void main(String[] args) {
        Manager manager = new Manager("李四","南充","NC001",5536.6,26);
        Manager manager2 = new Manager("张三","南充","NC001",99999,26);
        double managerWage = manager2.add("经理");
        double simpleWage = manager.add("");
        System.out.println("经理的薪资"+managerWage);
        System.out.println("普通员工的薪资"+simpleWage);

    }
}
