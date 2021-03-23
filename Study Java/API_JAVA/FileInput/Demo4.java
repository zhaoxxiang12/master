package FileInput;

import java.io.FileReader;
import java.io.IOException;

public class
Demo4 {
    public static void main(String[] args) throws IOException {
        //1.字符流就是为了文本服务的FileReader 文件字符读取流
        FileReader fr = new FileReader("API_JAVA/FileInput/test.txt");  //UTF-8
//        FileReader fr = new FileReader("API_JAVA/FileInput/GBK.txt"); //GBK
//        int read = fr.read();//一次只读取一个字符
//        System.out.println((char) read);
//
//        int r2 = fr.read();
//        System.out.println(r2);

        //采用单个字符读取来输出全部内容
//        int length = 0; //实际每个字符的码表值
//        while ((length = fr.read()) != -1) {//判断是否到了文件的末尾
//            System.out.println((char) length);
//        }
        //升级:读取十个字符转一次
        char[] buffer = new char[10]; //缓冲区(提高效率)
        int len = 0;//实际读取到的字符个数(把实际读取到的字符都放入buffer中)
        while ((len = fr.read(buffer)) != -1) {
            String str = new String(buffer,0,len);//len 实际读取到的字符个数
            System.out.print(str);
        }
    }
}
