package OperateExcel;


import java.io.Serializable;

public class Students implements Serializable {
    private static final long serialVersionUID = 1L;
    private long StudentID;
    private String name;
    private String sex;
    private String birth;
    private String major;

    public Students() {
        super();
    }

    public Students(long studentID, String name, String sex, String birth, String major) {
        super();
        StudentID = studentID;
        this.name = name;
        this.sex = sex;
        this.birth = birth;
        this.major = major;
    }

    public long getStudentID() {
        return StudentID;
    }

    public void setStudentID(Integer studentID) {
        StudentID = studentID;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "Students{" +
                "StudentID=" + StudentID +
                ", name='" + name + '\'' +
                ", sex='" + sex + '\'' +
                ", birth='" + birth + '\'' +
                ", major='" + major + '\'' +
                '}';
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getBirth() {
        return birth;
    }

    public void setBirth(String birth) {
        this.birth = birth;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }
}
