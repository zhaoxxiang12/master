package FIleCorporate;

import java.io.File;

public class FileDemo3 {
    public static void main(String[] args) {
        File file = new File("E:/PrivateFile");
        printFile(file);
    }
    public static void printFile(File file) {
        if (file == null || !file.exists()) {
            System.out.println("当前文件对象不存在");
            return;
        }
        //1.判断这个路径到底是文件还是文件夹
        if (file.isFile()) {
            System.out.println(file);
            return;
        }
        //2.需要遍历文件夹
        System.out.println(file);
        //获取当前文件夹中的所有子文件
        File[] listFiles = file.listFiles();
        for (File f : listFiles) {
            if (f.isFile()) {//判断子文件对象是否是文件
                System.out.println("\t"+f);
            } else {
                printFile(f);
            }
        }
    }
}
