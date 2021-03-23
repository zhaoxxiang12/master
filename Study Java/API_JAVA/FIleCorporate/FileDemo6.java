package FIleCorporate;

import java.io.File;

public class FileDemo6 {
    public static void main(String[] args) {
        //1.统计文件大小
        File file = new File("D:/Oracle");
        long fileSize = getFileSize(file);
        System.out.println(fileSize);
    }

    public static long getFileSize(File file) {
        if (file == null || !file.exists()) {
            return 0;
        }
        //1.判断是否为文件
        if (file.isFile()) {
            return file.length();
        }
        //2.遍历当前文件夹下的所有子文件
        long size = 0;
        File[] listFiles = file.listFiles();
        for (File f : listFiles) {
            size += getFileSize(f);
//            if (f.isFile()) {
//                size += f.length();
//            } else { //文件
//                size += getFileSize(f);
//            }
        }
        return size;
    }
}
