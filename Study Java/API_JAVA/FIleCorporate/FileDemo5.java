package FIleCorporate;

import java.io.File;

public class FileDemo5 {
    public static void main(String[] args) {
        File file = new File("E:/PrivateFile/master/Study Java/API_JAVA/Collection");
        searchFile(file,".JAVA");
    }
    /**
     * 根据扩展名来查找文件
     * @param dir 文件夹路径/盘符
     * @param suffix 文件后缀名
     */
    public static void searchFile(File dir,String suffix) {
        if (dir == null || !dir.exists()||suffix==null||"".equals(suffix)) {
            System.out.println("当前文件对象不存在");
            return;
        }
        suffix = suffix.toLowerCase();
        //1.判断这个路径到底是文件还是文件夹
        if (dir.isFile()) {
            return; //结束递归条件
        }
        //2.需要遍历文件夹
        //获取当前文件夹中的所有子文件
        File[] listFiles = dir.listFiles();
        boolean flag = true;
        for (File f : listFiles) {
            if (f.isFile()) {//判断子文件对象是否是文件
                //在当前这个文件夹中去查找后缀名的文件是否存在
                if(f.getName().endsWith(suffix)) {
                    System.out.println(f);
                    flag = false;
                }

            } else {//子文件夹中继续找直到找到为止
                searchFile(f,suffix);
            }
        }
        if (flag){
            System.out.println(dir+"中没有扩展名为:"+suffix+"的文件");
        }
    }
}
