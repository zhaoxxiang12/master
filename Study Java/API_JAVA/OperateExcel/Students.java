package OperateExcel;


import java.io.Serializable;
import java.util.Date;

public class Students implements Serializable {
    private static final long serialVersionUID = 1L;
    private long StudentID;
    private String name;
    private String sex;
    private Date birth;
    private String major;

    public Students() {
        super();
    }

    public Students(long studentID, String name, String sex, Date birth, String major) {
        super();
        StudentID = studentID;
        this.name = name;
        this.sex = sex;
        this.birth = birth;
        this.major = major;
    }

    public Students(long studentID, String name, String sex, Date birth) {
        StudentID = studentID;
        this.name = name;
        this.sex = sex;
        this.birth = birth;
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

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }
}
