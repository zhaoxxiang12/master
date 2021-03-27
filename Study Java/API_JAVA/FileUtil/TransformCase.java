package FileUtil;

import java.io.*;

public class TransformCase {
    public static void main(String[] args) throws IOException {
        //1.从键盘向文件中写数据
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw =new BufferedWriter(new FileWriter("API_JAVA/FileUtil/a.txt"));
        int i = 0; //统计输出的行数
        for (;;i++){
            System.out.println("输入内容");
            String str =br.readLine();
            if ("end".equalsIgnoreCase(str)){//输入end就结束
                break;
            }
            bw.write(str);//暂时将一行数据放在缓冲区
            bw.newLine();//换行
        }
        System.out.println("用户输入了"+i+"行");
//        bw.flush();//更新缓冲区
        bw.close();//关闭之前先刷新缓冲区再关流
        //只有flush后,缓冲区的数据才会写入到文件中
    }
}
