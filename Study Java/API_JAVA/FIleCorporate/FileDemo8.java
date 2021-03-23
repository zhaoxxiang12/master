package FIleCorporate;

import java.io.File;

public class FileDemo8 {
    public static void main(String[] args) {
        //获取文件路径
        File file = new File("a.txt");
        System.out.println(file.getPath()); //相对路径
        System.out.println(file.getAbsolutePath()); //绝对路径
    }
//    public static void getPath(File file){
//        if (file==null||fi)
//    }
}
