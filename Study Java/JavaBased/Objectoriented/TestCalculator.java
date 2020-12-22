package Objectoriented;

/**
 * 我们自定义出来的一个类，它本身就是一种引用数据类型
 */
public class TestCalculator {//类的功能：测试辅助类

    public static void main(String[] args) { // 程序入口
        //1.如何通过类来创建对象
        Calculator calculator;//对象的声明
        calculator = new Calculator();//对象的创建及赋值

        //2.对象属性的访问及赋值
        System.out.println(calculator.brand);//访问计算器的品牌

        //3.对象属性的赋值
        calculator.brand = "晨光";
        System.out.println(calculator.brand);

        // 对象方法的调用
//        System.out.println(calculator.add(7,8);); // print/println 不能打印方法返回值void的方法
        calculator.add(7, 8);
//        calculator.division(7.22,7.2);
        calculator.reduction(7.22, 7.2); // 7.22-7.2=0.019999999999999574
        // float/double 本身就存在精度差，以后使用BidDecimal（大定点数）
//        calculator.sqrt(3);
//        calculator.power(2.5,3);
//        calculator.createRandom();

        //需要产生10个随机数
        System.out.println("-------------");
//        for(int i =0;i<11;i++){
//            calculator.createRandom();
//        }
        //产生1-10之间的随机数  [0,1)*10+1 =(int)[1,11)
//        for(int i =0;i<11;i++){
//            calculator.intRandom();
//        }
        //产生1-3之间的随机数
//        for (int i = 0; i < 11; i++) {
//            calculator.minRandom();
//
//        }

        calculator.test();

        System.out.println("----------------------------------");
        // 石头剪刀布    验证码   自己写一个mySort
        // 类中写一个bubbleSort(数组）实现降序排序
        // 写一个MyMath类，类中1.写一个求任意数的阶乘的方法  2.类中一个判断是否是水仙花数 是true  不是false
        // 3.类中写一个能实现数组倒序的方法
        // 创建一个poker 属性 花色   点数num 1.初始化牌的方法int（） 模仿买一副牌AAAA  2222.。。kkk
        // 2.看牌  控制台打印每四个换一行显示 3.洗牌（随机打乱54张牌的顺序） 4.发牌 （三位玩家轮流那排，底牌三张）
        // 点point类，类中有x，y 要求能输出坐标  圆类circle 有圆心center 半径r 圆心为3.0 4.0 半径10cm
        calculator.verify();
    }
}