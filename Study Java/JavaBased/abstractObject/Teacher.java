package abstractObject;

public abstract class Teacher {
    private String name;
    private String tno;

    /**
     * 抽象 授课行为：不知道每一位老师能上什么课程
     */
    public abstract void teaching();

    public void info() {
        /**
         * 教师的官方介绍 (普通方法)
         */
        System.out.println(name + "教师" + "工号为" + tno);
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setTno(String tno) {
        this.tno = tno;
    }

    public String getTno() {
        return tno;
    }

    public Teacher() {
        super();
    }

    public Teacher(String name, String tno) {
        super();
        this.name = name;
        this.tno = tno;
    }
}
