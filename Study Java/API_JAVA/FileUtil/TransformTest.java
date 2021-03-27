package FileUtil;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class TransformTest {
    public static void main(String[] args) throws IOException {
        //1.如何使用IO流读取键盘输入System.in(printSteam )
        //键盘输入流实际上就是一个字节流
//        InputStream ps = System.in; //会产生阻塞(等待键盘输入)
//        int read = ps.read();
//        System.out.println(read);

        //常用的键盘应该使用字符流比较简单,类似于scanner.nextLine()
        //1.转换流(将字节流转换成字符流InputStreamReader)
        InputStreamReader isr = new InputStreamReader(System.in);//字节流转换成字符流 Reader
        BufferedReader br = new BufferedReader(isr);
        System.out.println(br.readLine());
    }
}
