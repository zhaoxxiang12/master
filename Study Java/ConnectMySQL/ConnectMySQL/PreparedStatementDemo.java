package ConnectMySQL;

import java.sql.*;

public class PreparedStatementDemo {
    public static void main(String[] args) throws SQLException {
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
        /**
         * 插入
         */
        PreparedStatement insert = connection.prepareStatement("insert  into manager values (?,?,?)");//插入语句
        insert.setString(1, null);
        insert.setString(2, "关羽");
        insert.setString(3, "123455");
        /**
         * 更新
         */
        PreparedStatement update = connection.prepareStatement("update manager set username = ? where id = ?");
        update.setString(1, "赵云");
        update.setInt(2, 3);
        /**
         * 删除
         */
        PreparedStatement delete = connection.prepareStatement("delete  from manager where id =?");
        delete.setInt(1,3);
        /**
         * 查询
         *
         */
        PreparedStatement query = connection.prepareStatement("select  * from manager");
        //4.执行sql语句
        insert.executeUpdate();
        update.executeUpdate();
        delete.executeUpdate();
        ResultSet rs = query.executeQuery();

        //解析结果集
        while (rs.next()) {
            int id = rs.getInt("id");
            String name = rs.getString("username");
            String password = rs.getString("password");
            System.out.println(id+"...."+name+"....."+password);
        }
        //5.释放资源
        insert.close();
        update.close();
        query.close();
        connection.close();
    }
}
