package FileUtil;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * 总结:
 *   1.文本文件推荐使用字符流(不太关注编码问题)
 *   2.多媒体文件(视频\音频)必须使用字节流(在复制文本时,有可能会因为缓冲区设置不当带来乱码问题)
 *   3.文本一律使用字符流来处理,多媒体文件一律使用字节流处理
 */
public class OptimizeFileUtil {
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
        int length = 0; //实际读取到的字节个数
//        byte [] buffer = new byte[8192]; //8KB缓冲区
        byte [] buffer = new byte[1027*1024*1024];//10MB缓冲区
        while ((length = fis.read(buffer)) != -1) {//判断是否已经读取到了文件的末尾
            fos.write(buffer,0,length); //使用缓冲区速度明显加快
        }
        System.out.println("复制完成");
        //5.释放资源
        fos.close();
        fis.close();
    }
}
