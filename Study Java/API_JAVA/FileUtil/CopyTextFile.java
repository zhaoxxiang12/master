package FileUtil;

import java.io.*;

/**
 * 通用的文本复制工具(自带8KB缓冲区)
 */

public class CopyTextFile {
    public static void main(String[] args) {
        try {
            copyTextByBuffer("E:/JAVATEXT/test.txt", "E:\\COPYTEST\\copy.txt");
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static void copyTextByBuffer(String oldFile, String newFile) throws IOException {
        long startTime = System.currentTimeMillis(); //程序执行的开始时间
        if (oldFile == null || "".equals(oldFile) || newFile == null || "".equals(newFile)) {
            System.out.println("文件错误");
            return;
        }
        //判断源文件与赋值后的文件扩展名是否一致 KDA-MORE.mp3
        String suffixOld = oldFile.substring(oldFile.lastIndexOf("."));
        String suffixNew = newFile.substring(newFile.lastIndexOf("."));
        if (!suffixNew.equals(suffixOld)) {
            System.out.println("文件格式不正确");
            return;
        }
        //1.判断源文件是否存在
        File file = new File(oldFile);
        if (!file.exists()) {
            System.out.println("源文件不存在");
            return;
        }

        //2.将源文件通过IO流(字符流)进行读取
        FileReader fr = new FileReader(file);
        FileWriter fw = new FileWriter(newFile);

       //3.创建缓冲区
        char [] buffer = new char[8192];
        int length = 0;//返回的是实际读取到的字符个数
        while ((length=fr.read(buffer))!=-1){ //判断是否读取到文件末尾
            fw.write(buffer,0,length); //写入缓冲区中实际的字符个数
        }
        //4.开始实现复制过程(边读边写)

        System.out.println("复制完成");
        long endTime = System.currentTimeMillis(); //程序执行的结束时间
        System.out.println("程序耗时："+(endTime -startTime)+"ms");
        //5.释放资源
        fw.close();
        fr.close();
    }
}
