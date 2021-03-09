package FIleCorporate;

import java.io.File;
import java.io.IOException;

public class Test {
    public static void main(String[] args) throws IOException {
        //1.需求:在E:\Test中创建一个baidu.txt
        File file = new File("E:\\Test\\baidu.txt");
        //只适用于文件夹存在时可以创建文件,不存在时则抛出异常 java.io.IOException
        //2.判断这个路径是否存在
        if(!file.exists()){
            System.out.println("文件路径不存在");
            //3.创建一个文件
            file.createNewFile();

        }

    }
}
