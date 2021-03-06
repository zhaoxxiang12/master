package CollectionHomework;



public class Student {
    private String name;
    private String className;
    private double score;

    public Student() {
        super();
    }

    public Student(String name, String className, double score) {
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

//    @Override
//    public String toString() {
//        return "Student{" +
//                "name='" + name + '\'' +
//                ", className='" + className + '\'' +
//                ", score=" + score +
//                '}';
//    }

    // 重写Object的equals来比较每个属性是否相同
    // 重写equals的目的:在忽略地址的前提下来判断是否是同一个对象
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj instanceof Student) {
            Student stu = (Student) obj;
            if (this.className != stu.getClassName()) {
                return false;
            }
            if (this.score != stu.getScore()) {
                return false;
            }
            if (!this.name.equals(stu.getName())) {
                return false;
            }
            return true;
        }
        return false;
    }
    // 重写hashCode()方法:JVM默认会给每一个对象产生一个地址
    @Override
    public int hashCode(){
        int hashCode = super.hashCode(); // JVM随机分配的,只要出现new,结果值必然不一样
        System.out.println("对象的地址为:"+hashCode);
        return 1;
    }
}
