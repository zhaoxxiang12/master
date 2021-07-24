package ConnectMySQL;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 * boolean.excute() 增删改返回false  查询返回true 底层使用的
 */
public class Demo {
    public static void main(String[] args) throws Exception {
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
        //4.执行sql语句（查询数据）
        ResultSet rs = statement.executeQuery("select * from computer ");
        while (rs.next()){
            /**
             * getInt(int i) 根据第几个字段获取对应字段的数据
             * getInt(String name) 根据指定的字段名获取指定的数据
             *
             * getString(int i)
             * getString(String name)
             */
//           int id1= rs.getInt(1);
//            System.out.println(id1);
//           int id2= rs.getInt("id");
//           System.out.println(id2);
            String name = rs.getString(2);
            System.out.println(name);
            String name2 = rs.getString("name");
//            System.out.println(name2);
        }
        //System.out.println(i);
        //5.修改操作
//        int j = statement.executeUpdate("update user set name = '吕布'where id = '1'");
//        System.out.println(j);
        //6.添加操作
//        int k = statement.executeUpdate("insert  into user values (null,'貂蝉',18,'女')");
//        System.out.println(k);
        //7.删除操作
//        int l = statement.executeUpdate("delete  from user where id = 1");
//        System.out.println(l);
        //返回值表示实际影响的数据条数
        //释放资源
        statement.close();
        connection.close();
    }
}
