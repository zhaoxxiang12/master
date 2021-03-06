package ObjectHomeworkPerson;

public class Manager extends Employee2 {
    private String level = "";
    public Manager(String name,String address,String ID,double wage,int age){
        super(name,address,ID,wage,age);
        this.level = level;
    }
    public Manager(String level){
        this.level = level;
    }

    public Manager() {  // 无参构造方法
        super();
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }
}
