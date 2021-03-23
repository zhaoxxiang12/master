package FileInput;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Arrays;

public class Demo2 {
    public static void main(String[] args) {
        String path = "API_JAVA/FileInput/Chinese.txt";
        FileInputStream fileInputStream = null;
        try {
//            fileInputStream = new FileInputStream(path);
            fileInputStream = new FileInputStream("API_JAVA/FileInput/test2.txt");
//            int r1 = fileInputStream.read();
//            int r2 = fileInputStream.read();
//            int r3 = fileInputStream.read();
//            int r4 = fileInputStream.read();
            //演示乱码(Unicode中文占2个字节,GBK编码[英文占1一个byte 中文占两个byte)
            //需要使用UTF-8编码(英文占1个,中文占3个)
//            System.out.println((char)r1);
//            System.out.println((char)r2);
//            System.out.println((char)r3);

            //中文合并规则(UTF-8 3byte合并成一个中文字符)
            byte []bytes = new byte[10]; //缓存区(最佳字节组大小8KB=8192)
//            int read = fileInputStream.read(bytes,0,6); //read表示实际读取到的字节数(中国转换成了6byte),若缓存区够大,可以一次性全部都取出来
//            System.out.println(read);
//            int read2 = fileInputStream.read(bytes);
            // read(字节组,从数组哪个下标开始读取,读取多少个)
//            System.out.println(read2);
//            System.out.println(Arrays.toString(bytes));
//             int read3 = fileInputStream.read(bytes,3,6);//将所有字节一个个的放入bytes中

            int read4  = fileInputStream.read(bytes);
             System.out.println(read4);
//             byte [] buf = {bytes[3],bytes[4],bytes[5]};

            //将字节数组中的一组3个byte的数据重新组成一个UTF-8格式的中文字符
            String s = new String(bytes,"UTF-8");
            System.out.println(s);
        } catch (FileNotFoundException e) {
            System.out.println("文件未找到");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                fileInputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
