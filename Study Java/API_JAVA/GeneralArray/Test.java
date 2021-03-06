package GeneralArray;


public class Test {
    public static void main(String[] args) {
        // 类似于JDK1.5版本之前的ArrayList
        MyArray array = new MyArray();
        array.add("abc"); //String 上转型Object类型
        array.add(12);
        array.add(true);
        array.add(12.9);
        //类型转换异常
        Object obj=array.getArray(0);
        System.out.println(array.display());

        //泛型自定义数组  作用:将类型的检查从运行期提前到了编译期
    }
}
