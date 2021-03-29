package FileProperties;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

/**
 * 属性文件的加载
 */
public class PropertiesLoad {
    public static void main(String[] args) {
        //1.创建一个属性文件对象
        Properties properties = new Properties();
        //2.加载属性文件(将info.properties中的内容读取到properties这个对象中)
        try{
            FileInputStream fis = new FileInputStream("API_JAVA/FileProperties/info.properties");
            properties.load(fis);
            //3.通过键值来验证数据
            String name = properties.getProperty("name");
            System.out.println(name);
            String gate = properties.getProperty("gate");
            System.out.println(gate);
        }catch (IOException e){
            e.printStackTrace();
        }

    }
}
