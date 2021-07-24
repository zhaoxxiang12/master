package JDBCUtil;

import java.sql.*;
import java.util.Properties;

public class jdbcUtil {
    private static String driver;
    private static String url;
    private static String username;
    private static String password;

    static {
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
            System.out.println("初始化失败");
        }
    }

    public static void add() throws Exception {
        Connection connection = jdbcUtil.getConnection();
        //获取sql语句对象
        PreparedStatement ps = connection.prepareStatement("insert into manager values (?,?,?)");
        ps.setInt(1, 1);
        ps.setString(2, "大乔");
        ps.setString(3, "123456");
        ps.executeUpdate();
        //释放资源
        jdbcUtil.close(connection, ps);
    }

    public static void query() throws SQLException {
        Connection connection = jdbcUtil.getConnection();
        PreparedStatement ps = connection.prepareStatement("select * from manager where username = ? and password = ?");
        ps.setString(1, "关羽");
        ps.setString(2, "123456");
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            int id = rs.getInt("id");
            String name = rs.getString("username");
            String password = rs.getString("password");
            System.out.println(id + "...." + name + "....." + password);
        }
        close(connection, ps, rs);
    }

    public static Connection getConnection() throws SQLException {
        //获取数据库连接对象
        Connection connection = DriverManager.getConnection(url, username, password);
        return connection;
    }

    public static void close(Connection connection, PreparedStatement preparedStatement, ResultSet resultSet) {
        if (resultSet != null) {
            try {
                resultSet.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (preparedStatement != null) {
            try {
                preparedStatement.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public static void close(Connection connection, PreparedStatement preparedStatement) {
        close(connection, preparedStatement, null);
    }
}
