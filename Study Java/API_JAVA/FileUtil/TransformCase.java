package FileUtil;

import java.io.*;

public class TransformCase {
    public static void main(String[] args) throws IOException {
        //1.从键盘向文件中写数据
        System.out.println("输入内容");
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw =new BufferedWriter(new FileWriter("API_JAVA/FileUtil/a.txt"));
        String str =br.readLine();
        bw.write(str);
    }
}
