package ObjectInheritance5;

public class Test {
    public static void main(String[] args) {
       ZI zi = new ZI();
       zi.show();

        System.out.println("------------------------------");
        // 继承具有传递性
        //  A extends B  B extends C   : A 可以拥有B和C的所有非私有的成员，子类就会越来越强大
        //
        System.out.println(zi.name);
        System.out.println(zi.hobby);
    }
}
