package ObjectHomeworkPerson;

public class Employee2 extends Person2 {
    private String ID;
    private double wage;
    private int age;

    public Employee2() {
        super();
    }

    public Employee2(String name, String address, String ID, double wage, int age) {
        super(name, address);
        this.ID = ID;
        this.wage = wage;
        this.age = age;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public void setWage(double wage) {
        this.wage = wage;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getID() {
        return ID;
    }

    public double getWage() {
        return wage;
    }

    public int getAge() {
        return age;
    }

    public double add(String judge) { // judge:0代表经理 1代表普通员工
        if (judge.equals("经理")) {
            this.wage = wage * 0.2;
        } else {
            this.wage = wage * 0.1;
        }
        return wage;
    }
}
