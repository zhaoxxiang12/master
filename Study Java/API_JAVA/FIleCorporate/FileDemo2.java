package FIleCorporate;

import java.io.File;
import java.io.IOException;

/**
 * 文件递归操作
 *exists()   mkdirs()  creatNewFile()  isFile()  length()
 *
 *
 * 面试必备
 * 递归实现
 * 1.打印文件夹中所有问价及文件夹
 * 2.从文件夹中查找某个文件(通过扩展名查找)
 * 3.统计某个文件夹的大小
 * 4.删除文件夹
 */
public class FileDemo2 {
    public static void main(String[] args) throws IOException {
        //1.给出任意一个文件路径,来创建这个这个文件(若文件夹不存在需要自动创建出来)
        String path = "E:/Java测试用例/文件操作/test.txt";
        int index = path.lastIndexOf("/");
        String dirPath = path.substring(0,index+1);
        String fileName = path.substring(index+1);
        File dir = new File(dirPath);
        if(!dir.exists()){  //判断文件夹是否存在
            dir.mkdirs();  //创建多级目录
        }
        //2.构建文件对象
        File file = new File(dir,fileName);
        if(!file.exists()){
            file.createNewFile();
        }
        System.out.println("文件已找到");

    }
}
