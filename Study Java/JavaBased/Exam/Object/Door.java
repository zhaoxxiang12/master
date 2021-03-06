package Exam.Object;

public abstract class Door {
    private String type;
    private String name;
    public Door(){
        super();
    }
    public Door (String name,String type){
        super();
        this.name = name;
        this.type = type;
    }
    // 关门
    public abstract void close();
    //开门
    public abstract void open();
}
