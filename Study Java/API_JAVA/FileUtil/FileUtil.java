package FileUtil;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileUtil {
    public static void main(String[] args) {
        try {
            copyMedia("D:/KuGou/KDA-MORE.mp3", "D:/KuGou/KDA-MORE-copy.mp3");
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static void copyMedia(String oldFile, String newFile) throws IOException {
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

        //2.将源文件通过IO流进行读取
        FileInputStream fis = new FileInputStream(file);

        //3.创建最终写出字节流
        FileOutputStream fos = new FileOutputStream(newFile); //被复制后的新文件名

        //4.开始实现复制过程(边读边写)
        int length = 0; //读取到的字节的实际值

        while ((length = fis.read()) != -1) {//判断是否已经读取到了文件的末尾
            fos.write(length); //效率问题:读一个写一个太慢
        }
        System.out.println("复制完成");
        //5.释放资源
        fos.close();
        fis.close();
    }
}
