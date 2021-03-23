package FileInput;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * 字节输入流的顶层抽象类
 * inputStream字节输入流
 * fileInputStream 文件字节输入(读取文件)
 *
 * 读文件时的异常 FileNotFoundException  原因:文件不存在(判断文件是否存在再捕获异常)
 *
 */
public class Demo1 {
    public static void main(String[] args) {
        FileInputStream fis = null;
        String path = "API_JAVA/FileInput/test.txt";
        try {
            //1.创建文件字节输入流对象(读取文件)
            fis = new FileInputStream(path); //打开文件
            //2.read()一个字节一个字节的读
            int r1 = fis.read(); //一次读取一个字节
            int r2 = fis.read();
            int r3 = fis.read();
            int r4 = fis.read();
            int r5 = fis.read();
            int r6 = fis.read();
            int r7 = fis.read();
            System.out.println(r1); //49
            System.out.println(r2); //50
            System.out.println(r3); //51
            System.out.println(r4); //51
            System.out.println(r5); // -1 回车 13
            System.out.println(r6); // -1 回车 10
            System.out.println(r7); // -1表示末尾
        } catch (FileNotFoundException e) {
            System.out.println("文件未找到");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                fis.close();//释放资源
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
