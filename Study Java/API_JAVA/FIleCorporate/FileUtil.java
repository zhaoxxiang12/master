package FIleCorporate;

import java.io.File;

public class FileUtil {
    /**
     * 递归统计文件及文件夹的大小
     *
     * @param file 文件路径
     * @return 文件大小(byte)
     */
    public static long getFileSize(File file) {
        if (file == null || !file.exists()) {
            return 0;
        }
        //2.判断这个文件对象是否存在
        if (!file.exists()) {
            return 0;
        }
        //3。判断是否是文件,若是则直接返回文件大小即可
        if (file.isFile()) {
            return file.length(); //递归结束条件
        }
        //4.获取文件夹中所有的文件对象
        File[] listFiles = file.listFiles();//获取当前file路径下的所有子文件对象(文件和文件夹对像)
        //5.使用递归来统计文件夹的大小
        long size = 0;
        for (File f : listFiles) {
            if (f.isFile()) {//判断子文件对象是否是文件
                size += f.length();
            } else {//不是文件文件一定是文件夹(文件夹默认没有大小的)
                size += getFileSize(f);
            }
        }
        return size;
    }
}
