package FileInput;

import java.io.FileInputStream;
import java.io.IOException;

public class Demo3 {
    public static void main(String[] args) throws IOException {
        String path = "API_JAVA/FileInput/test.txt";
        FileInputStream fis = new FileInputStream(path);
//        fis.read();//一次只能读取一个字节
        byte[] buffer = new byte[10]; //
        fis.read(buffer);//将实际的字节数读取到buffer数组中

        String  str = new String(buffer,"UTF-8");
        System.out.println(str);
    }
}
