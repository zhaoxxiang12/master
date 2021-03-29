package FileProperties;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.Properties;

public class PropertiesDemo {
    public static void main(String[] args) {
        //properties 属性文件类(文件类型：***.properties key=value) 底层是hashtable
        Properties properties = new Properties();
        //1.存数据(Properties中键和值都是字符串)
        properties.setProperty("gender","男");
        properties.setProperty("address","上海");
        //2.如何通过key来获取value
        String gender =properties.getProperty("gender");
        System.out.println(gender);



//        Hashtable<Integer,String> hashtable = new Hashtable<Integer,String>();
//        hashtable.put(null,""); //hashtable中不能存在空键 JDK1.0线程安全
//        hashtable.put(1,null); //hashtable中不能存在空值
//        HashMap<Integer,String>hashMap = new HashMap<Integer,String>();
//        hashMap.put(null,""); //HashMap可以存放空键空值JDK1.2非线程安全
//        hashMap.put(1,null);
    }
}
