package FIleCorporate;

import java.io.File;

public class Test3 {
    public static void main(String[] args) {
        //1.计算文件和文件夹的大小
        File file = new File("D:\\WeGame");
        File file2 = new File("D:\\WeGame\\acceleration.dll");
        long filesize = FileUtil.getFileSize(file);
        long filesize2 = FileUtil.getFileSize(file2);
        System.out.println(filesize);
        System.out.println(filesize2);
    }
}
