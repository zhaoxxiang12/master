package ConnectMySQL;

import java.sql.*;
import java.util.Scanner;

/**
 * 模拟用户登录
 *
 * 以下代码虽然能实现登录,但是存在SQL注入问题
 */
public class Demo3 {
    public static void main(String[] args) throws SQLException {
        Scanner scanner = new Scanner(System.in);

        System.out.println("输入用户名");
        String username = scanner.nextLine();
        System.out.println("输入密码");
        String password = scanner.nextLine();

       boolean b= loginIN(username, password);
       if (b){
           System.out.println("Success");
       }else {
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
        Statement statement = connection.createStatement();
        //4.执行sql语句，查询操作
        String sql = "select * from manager where username ='"+username+"'and password='"+password+"'";
        System.out.println(sql);
        ResultSet rs = statement.executeQuery(sql);
        return rs.next();
    }
}
