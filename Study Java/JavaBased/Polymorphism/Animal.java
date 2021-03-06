package Polymorphism;

public class Animal {
    private String name;
    private char sex;

    public Animal() {
        super();
    }

    public Animal(String name, char sex) {
        super();
        this.name = name;
        this.sex = sex;
    }

    public char getSex() {
        return sex;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSex(char sex) {
        this.sex = sex;
    }

    @Override
    public String toString() {
        return "Animal [name = " + name + "," + "sex = " + sex + "]";
    }
}
