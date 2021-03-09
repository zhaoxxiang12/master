package FIleCorporate;

import java.io.File;

/**
 * file.isFile() 与file.isDirectory()是互斥的  是文件就是不是文件夹  反之也如此
 */
public class FIleDemo {
    public static void main(String[] args) {
        //1.创建一个文件对象(文件类File)
        String pathName = "a.txt";//文件在磁盘中的路径(绝对路径)或者相对路径(文件中工程中的路径)
        String pathname2 = "Test/b.txt"; // 反斜杠是转义字符,所以路径需要两个反斜杠,可以使用一个正斜杠代替
        String pathName3= "E:\\PrivateFile\\master\\Study Java\\API_JAVA\\Test\\b.txt";
        String pathName4= "E:\\PrivateFile\\master\\Study Java\\API_JAVA\\Test";
        //通过路径创建文件对象
        File file = new File(pathName3);
        File file2 = new File(pathname2);
        File file3 = new File(pathName3);
        File file4 = new File(pathName4);

        //1.判断此路径下的这个文件对象是否存在
//        if(file.exists()){
//            System.out.println("true");
//        }else{
//            System.out.println("false");
//        }

//        if(file2.exists()){
//            System.out.println("true");
//        }else{
//            System.out.println("false");
//        }
        //2.判断是否是文件还是文件夹 注意:File重写了toString()方法
//        if(file3.isFile()){ // 是否是文件
//            System.out.println("是文件(带后缀名)"+file3);
//        }
//        if(file4.isDirectory()){ //是否是文件夹
//            System.out.println("true");
//        }

        //3. 查看当前文件的大小(文件夹默认是没有大小的) file.length(单位是字节byte)
        long size = file3.length();
        System.out.println(size);
    }
}
