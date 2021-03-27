package FileUtil;

import java.io.*;

public class BufferDemo1 {
    public static void main(String[] args) throws IOException {
        CopyTextBuffer();
    }

    /**
     * 自带缓冲区字符流复制
     * @throws IOException
     * @throws FileNotFoundException
     */
    public static void CopyTextBuffer() throws IOException,FileNotFoundException {
        long startTime = System.currentTimeMillis();
        //1.创建缓冲字符读取流
        FileReader fr = new FileReader("E:\\JAVATEXT\\test.txt");
        BufferedReader br = new BufferedReader(fr);

        //2.创建缓冲字符写出流
        FileWriter fw = new FileWriter("E:\\COPYTEST\\bufferCopy.txt");
        BufferedWriter bw = new BufferedWriter(fw);

        //3.实现复制
        String readLine = null;
        while ((readLine = br.readLine()) != null) { // readLine()读取到末尾返回null
            bw.write(readLine);//一行一行读取到缓冲区,在一次写
            bw.newLine();//每行结束后加一个换行符
        }
        long endTime = System.currentTimeMillis();
        System.out.println("程序耗时：" + (endTime - startTime) + "ms");
        //4.释放资源
        bw.close();
        br.close();
    }

    /**
     * 自带缓冲区的字节流复制
     *
     * @throws IOException
     */
    public static void CopyMediaBuffer() throws IOException, FileNotFoundException {
        long startTime = System.currentTimeMillis();
        //1.自带缓存区的字节流
        FileInputStream fis = new FileInputStream("E:\\CloudMusic\\Luv Letter 3D.mp3");
        //缓冲字节输入流(读取数据)
        BufferedInputStream bis = new BufferedInputStream(fis);
        //2.自带缓冲区的字节输出流
        FileOutputStream fos = new FileOutputStream("E:\\Video\\test.mp3");
        BufferedOutputStream bos = new BufferedOutputStream(fos);
        //3.实现复制功能的核心代码
        int length = 0; //读取字节的真实值
        while ((length = bis.read()) != -1) {
            bos.write(length);
        }
        long endTime = System.currentTimeMillis();
        System.out.println("程序耗时间:" + (endTime - startTime) / 1000.0 + "s");
        //4.释放资源
        bos.close(); //当关闭buffered流时,里面的流也都会随之关闭
        bis.close();
    }
}
