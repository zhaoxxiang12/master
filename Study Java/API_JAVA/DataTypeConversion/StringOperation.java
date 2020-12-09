package DataTypeConversion;

public class StringOperation {
    public static void main(String[] args) {
        //字符类型的相关操作
        char ch = 'a'; //2byte
        int x = ch;  //4byte 97  自动查Unicode 表将字符转换成对应的十进制数
        //ASCII  'a':97   'A':65  '0':48
        char ch2 = 98;
        System.out.println(ch);
        System.out.println(ch2);

        System.out.println(x);
        System.out.println(ch+0);
        System.out.println(ch+1);
        System.out.println((char)(ch+1));  // 将参与运算后的结果转换成字符
        // 当char 单独使用时就是一个字符类型
        //当char 参与运算时，就会将char对照Unicode表转换成十进制再参与运算
    }
}
