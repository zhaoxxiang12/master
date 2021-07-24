package ConnectMySQL;

import java.sql.*;
import java.util.Scanner;

/**
 * 使用 PreparedStatement能够解决sql注入问题,使用了占位符,对SQL语句进行了预处理
 */
public class Demo4 {
    public static void main(String[] args) throws SQLException {
        Scanner scanner = new Scanner(System.in);

        System.out.println("输入用户名");
        String username = scanner.nextLine();
        System.out.println("输入密码");
        String password = scanner.nextLine();

        boolean b = loginIN(username, password);
        if (b) {
            System.out.println("Success");
        } else {
            System.out.println("Fail");
        }
    }

    public static boolean loginIN(String username, String password) throws SQLException {
        //1.注册驱动
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        //2.获取数据库连接对象
        String url = "jdbc:mysql://localhost:3306/test?&allowPublicKeyRetrieval=true&serverTimezone=UTC";
        Connection connection = DriverManager.getConnection(url,
                "root", "123456");
        //3.获取执行sql语句对象
        String sql = "select * from manager where username ='" + username + "'and password='" + password + "'";
        System.out.println(sql);
        PreparedStatement ps = connection.prepareStatement("select  * from manager where username = ? and password = ?");
        ps.setString(1, username);
        ps.setString(2, password);
        //4.执行sql语句，查询操作
        ResultSet rs = ps.executeQuery();
        return rs.next();
    }
}
