package FileUtil;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class TransformDemo {
    /**
     * 复制文件时保证文件编码一致
     * @param args
     * @throws IOException
     */
    public static void main(String[] args)throws IOException {
        //GBK的字符串转换成UTF-8格式的字符串
        BufferedReader br = new BufferedReader(new FileReader("API_JAVA/FileUtil/a.txt"));
        int read = br.read();
        System.out.println((char)read);
        String str = "你好"; //GBK
        String String = new String(br.readLine().getBytes("UTF-8"),"GBK");
        System.out.println(String);
    }
}
