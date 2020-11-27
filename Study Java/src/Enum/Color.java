package Enum;

enum ColorTwo{
    Red,Green,Blue;
}
// 样例(内部类中使用枚举)
//public class Color{
//    public static void main(String[] args){
//        ColorTwo c1 = ColorTwo.Red;
//        System.out.println(c1);
//    }
//}

//每个枚举都是通过 Class 在内部实现的，且所有的枚举值都是 public static final 的。

//class Color{
//    public static final Color Red = new Color();
//    public static final Color BLUE = new Color();
//    public static final Color GREEN = new Color();
//}
//
//以上的枚举类 Color 转化在内部类实现


/****
 * 迭代枚举元素
 *
 * 用for 语句来带俄代枚举元素
 * **/

//public class Color{
//    public static void main(String[] args){
//        for (ColorTwo myColor:ColorTwo.values()){
//            System.out.println(myColor);
//        }
//    }
//}


/***
 * 在switch中使用枚举
 *
 * 枚举类常应用于switch语句
 *
 * */

public class Color {
    public static void main(String[] args) {
        ColorTwo myColor = ColorTwo.Blue;

        switch(myColor) {
            case Red:
                System.out.println("红色");
                break;
            case Green:
                System.out.println("绿色");
                break;
            case Blue:
                System.out.println("蓝色");
                break;
        }
    }
}