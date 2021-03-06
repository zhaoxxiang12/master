package Packaging;

/**
 * 八大基本数据类型对应的包装类型
 * int  Integer
 * char Character
 *
 * byte Byte
 * boolean Boolean
 * short  Short
 * float Float
 * long  Long
 * double  Double
 *
 * 1.可以实现自动拆装箱
 * 2.与字符串进行互换  包装类名.parseXxx();  转换成字符串都是toString()
 * 3. == 若两个都是包装类型,则比较地址. 若有一个为基本类型,则包装类会自动拆箱,最终实际比较的就是基本数值
 */
public class Test4 {
    public static void main(String[] args) {
        char ch = 'a';
//        char ch2 = 48;  // char '\u0000'~'\uffff' 65535
        ch-=32;
//        System.out.println(ch);
//        System.out.println(ch+0);
        Character cha = ch; // 自动装箱
        Character cha2 = new Character('中'); // 自动装箱
        char ch2 = cha2; // 自动拆箱

        Character c1 = new Character('A');
        Character c2 = new Character('A');
        char c3 = c1;
        char c4 =c2;
        System.out.println(c1==c2);
        System.out.println(c1==c3);
        System.out.println(c1==c4);
    }
}
