package FileInput;

import java.io.FileWriter;
import java.io.IOException;

public class Demo6 {
    public static void main(String[] args) throws IOException {
        //1.使用字符流写FileWrite
        FileWriter fw = new FileWriter("API_JAVA/FileInput/writer.txt",true);
        //覆盖式写入
//        fw.write("hello world!");
//        fw.write("你好!中国!");
//        fw.write("\r\n");
//        fw.write("天照!");


        // append:true  追加式写入(字符流推荐的写法)
        fw.append("老六呀");
        fw.append("象拔蚌");
        fw.append("\r\n");
        fw.append("玩个66呀");
        fw.close();
    }
}
