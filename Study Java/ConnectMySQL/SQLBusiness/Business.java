package SQLBusiness;

import JDBCUtil.jdbcUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

/**
 * 转账案例
 */
public class Business {
    public static void main(String[] args) throws SQLException {
        Connection connection = jdbcUtil.getConnection();
//        获取执行sql语句对象
        PreparedStatement ps = connection.prepareStatement("update human set " +
                "money = money + ? where username = ?");
        //第一个人
        ps.setInt(1,-100);
        ps.setString(2,"吕布");
        ps.executeUpdate();
        //第二个人
        ps.setInt(1,+100);
        ps.setString(2,"貂蝉");
        ps.executeUpdate();

        //释放资源
        jdbcUtil.close(connection,ps);
    }
}
