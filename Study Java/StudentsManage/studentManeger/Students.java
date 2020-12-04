package studentManeger;

public class Students {
    //学生学号
    private String sid;
    //学生姓名
    private String name;
    //学生年龄
    private int age;
    //学生地址
    private String address;
    public Students(){

    }
    public Students(String sid,String name,int age,String address){
        this.sid = sid;
        this.name = name;
        this.age = age;
        this.address = address;
    }
    public String getSid(){
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}

