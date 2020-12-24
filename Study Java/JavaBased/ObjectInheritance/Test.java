package ObjectInheritance;

public class Test {
    public static void main(String[] args) {
        Employee employee =new Employee();
        System.out.println(employee.sex);
        Teacher teacher = new Teacher();
        Assistant assistant = new Assistant();
        teacher.sex="男";
//        teacher.show();// 因为show方法是私有的，不能进行调用
        System.out.println(teacher.sex);
        teacher.teaching();

        assistant.age =18;
        System.out.println(assistant.age);
        assistant.service();
    }
}
