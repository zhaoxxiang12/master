package FIleCorporate;

import javax.imageio.IIOException;
import java.io.File;
import java.io.IOException;

/**
 * file.mkdirs 创建多级文件夹
 */
public class Test2 {
    public static void main(String[] args) throws IOException {
        //需求:在E:\Test3中创建一个baidu.txt
        //1.创建父类文件夹对象
        File directory = new File("E:\\Test3\\测试");
       if (!directory.exists()){ //当这个文件对象是文件夹且这个文件不存在时需要手动创建出来
           directory.mkdirs();
       }
       File file = new File(directory,"baidu.txt");
       if (!file.exists()){
           try{
           file.createNewFile();//当文件不存在时就将这个文件创建出来
       }catch (IIOException e){ //当这个文件不存在时直接去创建文件就会出错
           e.printStackTrace();}
       }
       //1.删除此文件
        file.delete();//不进回收站(直接从磁盘删除,不要操作C盘)
    }
}
