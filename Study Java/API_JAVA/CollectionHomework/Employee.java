package CollectionHomework;

public class Employee {
    private String name;
    private String className;
    private double score;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employee)) return false;

        Employee employee = (Employee) o;

        if (Double.compare(employee.score, score) != 0) return false;
        if (name != null ? !name.equals(employee.name) : employee.name != null) return false;
        return className != null ? className.equals(employee.className) : employee.className == null;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = name != null ? name.hashCode() : 0;
        result = 31 * result + (className != null ? className.hashCode() : 0);
        temp = Double.doubleToLongBits(score);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
//        System.out.println("hashCode" + result);
        return result;
    }

    public Employee() {
        super();
    }

    public Employee(String name, String className, double score) {
        this.name = name;
        this.className = className;
        this.score = score;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}
