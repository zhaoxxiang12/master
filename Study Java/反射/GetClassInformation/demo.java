package GetClassInformation;

public class demo {
    public static void main(String[] args) throws Exception {
        Class clazz1 = Person.class;
        Person person = new Person();
        // 获取class类信息
        Class clazz2 = person.getClass();
        Class clazz3 = Class.forName("GetClassInformation.Person");

        System.out.println(clazz1 == clazz2);
        System.out.println(clazz2 == clazz3);
    }
}

class Person {
    private String name;
    private int age;

    public Person() {

    }

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
