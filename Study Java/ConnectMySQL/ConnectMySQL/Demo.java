package ConnectMySQL;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Demo {
    public static void main(String[] args) throws Exception {
        //1.注册驱动
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        //2.获取数据库连接对象
        String url = "jdbc:mysql://8.129.173.137:3306/covid19_qc_test?&allowPublicKeyRetrieval=true&serverTimezone=UTC";
        Connection connection = DriverManager.getConnection(url,
                "covid19_qc_test", "test_eVp51fMROx");
        //3.获取执行sql语句对象
        Statement statement = connection.createStatement();
        //4.执行sql语句
        ResultSet i = statement.executeQuery("select id,lab_name from report_lab_info where id = '1'");
        System.out.println(i);
        //释放资源
        statement.close();
        connection.close();
    }
}
