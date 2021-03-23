package FileInput;

import java.io.FileOutputStream;
import java.io.IOException;

/**
 *  FileOutputStream写出时,若文件存在则会自动创建出一个新的文件
 */
public class FileOutput {
    public static void main(String[] args) throws IOException {
        //1.向工程test3.txt写入一个文本(OutputStream)
//        FileOutputStream fos = new FileOutputStream("API_JAVA/FileInput/test4.txt");
        FileOutputStream fos = new FileOutputStream("API_JAVA/FileInput/test4.txt",true); //true表示追加
        fos.write(50); //将十进制98先转成二进制进行传输,后再转成十进制通过对照相应的字符码表来转换成最终的字符
        fos.write(48);
        fos.write(48);


        String str = "你好,中国!";
        byte[] bytes = str.getBytes();
        System.out.println(bytes.length);
        fos.write(bytes);//将字节数组直接交给输出流去传递

        //如何换行\r\n,回车换行 Linux /n
        fos.write("\r\n".getBytes());

        fos.close();
    }

}
