package Exam.Juicer;

public class Juicer {
    private String color;
    private String name;

    public Juicer() {
        super();
    }

    public Juicer(String color, String name) {
        super();
        this.name = name;
        this.color = color;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    //榨出水果汁
    public void squeeze(Fruits fruits) {
        System.out.println(color + name + "榨汁机正在榨出" + fruits.getFruitName() + "汁");
    }

    //榨出农作物汁
    public void squeeze(Grain grain) {
        System.out.println(color + name + "榨汁机正在榨出" + grain.getGrainName() + "汁");
    }

    //清洗功能
    public void clean() {
        System.out.println("正在清洗榨汁机");
    }
}
