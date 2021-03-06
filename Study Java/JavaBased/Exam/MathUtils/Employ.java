package Exam.MathUtils;

public class Employ extends Department {
    private int eId;
    private String eName;
    private int gender;
    private int age;
    public Employ(){
        super();
    }
    public  Employ(int eId,String eName,int gender,int age,String id, String dName, String area){
        super(id,dName,area);
        this.eId= eId;
        this.eName = eName;
        this.gender = gender;
        this.age = age;
    }

    public int geteId() {
        return eId;
    }

    public int getAge() {
        return age;
    }

    public int getGender() {
        return gender;
    }

    public String geteName() {
        return eName;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void seteName(String eName) {
        this.eName = eName;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public void setId(int eId) {
        this.eId = eId;
    }

    public String gender (int gender){
        if(gender == 0){
            return "男";
        }else {
            return "女";
        }
    }

}
