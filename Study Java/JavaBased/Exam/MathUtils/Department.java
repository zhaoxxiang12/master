package Exam.MathUtils;

public class Department {
    private String id;
    private String dName;
    private String area;

    public Department() {
        super();
    }

    public Department(String id, String dName, String area) {
        super();
        this.id = id;
        this.dName = dName;
        this.area = area;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getdName() {
        return dName;
    }

    public void setdName(String dName) {
        this.dName = dName;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }
}
