package JDBCUtil;

import java.util.Properties;

/**
 * 读取配置文件propertoes需要将配置文件放在resource下且将resource文件标记为resourceroot
 */
public class test {
    private static String driver;
    private static String url;
    private static String username;
    private static String password;

    public static void main(String[] args) {
        try {
            Properties properties = new Properties();
            properties.load(jdbcUtil.class.getClassLoader().getResourceAsStream("jdbc.properties"));
            driver = properties.getProperty("driver");
            url = properties.getProperty("url");
            username = properties.getProperty("username");
            password = properties.getProperty("password");
            //注册驱动
            Class.forName(driver);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(driver);
    }
}
