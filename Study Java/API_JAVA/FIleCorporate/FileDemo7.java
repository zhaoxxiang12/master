package FIleCorporate;

import java.io.File;

public class FileDemo7 {
    public static void main(String[] args) {
        //删除文件/夹
        File file = new File("D:/aa");
        deleteFile(file);
    }
    public static void deleteFile(File file){
        if (file==null||!file.exists()){
            return;
        }
        //1.判断是否是文件
        if (file.isFile()){
            file.delete(); //删除文件并返回一个Boolean
            return ;
        }
        //2.删除文件夹中的文件
        boolean flag = true;
        File [] fileLists = file.listFiles();
        for (File f:fileLists){
            if (f.isFile()){
               f.delete();
            }else{//文件夹
                deleteFile(f);
            }
        }
        file.delete();//删除空文件
    }
}
