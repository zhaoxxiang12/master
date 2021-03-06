package Array;

public class Test {
    public static void main(String[] args) {
        String [] str = new String[10];
        // 数组是定长的:一旦创建出数组后,他的长度就被确定了

        MyArray myArray =new MyArray(); // 通过无参创建出的自定义数组长度为0
        myArray.add("1");
        myArray.add("2");
        myArray.add("10");
        myArray.add("4");
        myArray.add("888");
        myArray.add("6");
        myArray.add("7");
//        System.out.println(myArray.display());
        //容量超多3/4打印数组长度
//        myArray.add("8");
//        System.out.println(myArray.display());

        // 查询数组
//        System.out.println(myArray.getArray(6));
//        System.out.println(myArray.getArray(8));
//        System.out.println(myArray.getArray(16));

        // 更新数组值
//        myArray.updateArray(0,"中国");
//        System.out.println(myArray.display());
//        System.out.println(myArray.getArray(0));
//        System.out.println(myArray.display());
//        System.out.println(myArray.getArray(3));

        //删除数组中的元素
//        myArray.remove(0);
//        System.out.println(myArray.getArray(0));
//        System.out.println(myArray.display());
//        System.out.println(myArray.getArray(3));
//        System.out.println("被删除的元素是"+myArray.remove(0));
//        System.out.println(myArray.display());
        // 查询元素个数
//        System.out.println(myArray.size());

        // 查询元素第一次出现的位置
        System.out.println(myArray.indexOf("9"));

        // 判断元素是否存在
        System.out.println(myArray.isEmpty());

        //判断元素是否在数组中存在
        System.out.println(myArray.contains("u"));

        // 元素出现的次数
        System.out.println(myArray.count("1"));

        // 随机打乱
//        System.out.println(myArray.display());
//        myArray.shuffle();
//        System.out.println(myArray.display());

        //数组倒序
        System.out.println(myArray.display());
        myArray.reverse();
        System.out.println(myArray.display());
    }
}
