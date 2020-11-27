package connectMySQL;

import java.sql.*;

public class connectMySQL {

    public static void  main(String[] args) {
        //声明Connection对象
        Connection con;
        //驱动程序名
        String driver = "com.mysql.jdbc.Driver";
        //URL指向要访问的数据库名mydata
        String url = "jdbc:mysql://8.129.173.137:3306/cov_report_test";
        //MySQL配置时的用户名
        String user = "cov_report_test";
        //MySQL配置时的密码
        String password = "test_udRQIHuW7v";
        //遍历查询结果集
        try {
            //加载驱动程序
            Class.forName(driver);
            //1.getConnection()方法，连接MySQL数据库！！
            con = DriverManager.getConnection(url, user, password);
            if (!con.isClosed())
                System.out.println("Succeeded connecting to the Database!");
            //2.创建statement类对象，用来执行SQL语句！！
            Statement statement = con.createStatement();
            //要执行的SQL语句
            String sql = "select * from common_province";
            //3.ResultSet类，用来存放获取的结果集！！
            ResultSet rs = statement.executeQuery(sql);
            System.out.println("-----------------");
            System.out.println("执行结果如下所示:");
            System.out.println("-----------------");
            System.out.println("id" + "\t" + "province_code"+"\t" + "province_name"+
                    "\t" + "pinyin_first"+"\t" + "pinyin_full"+ "abbreviate");
            System.out.println("-----------------");

            String id = null;
            String province_code = null;
            String province_name = null;
            String pinyin_first = null;
            String pinyin_full = null;
            String abbreviate = null;
            while (rs.next()) {
                //获取id这列数据
                id = rs.getString("id");
                //获取province_code这列数据
                province_code = rs.getString("province_code");
                //获取province_name这列数据
                province_name = rs.getString("province_name");
                //获取pinyin_first这列数据
                pinyin_first = rs.getString("pinyin_first");
                //获取province这列数据
                pinyin_full = rs.getString("pinyin_full");
                //获取province这列数据
                abbreviate = rs.getString("abbreviate");
                //输出结果
                System.out.println(id + "\t" + province_code+  "\t" + province_name+
                        "\t" + pinyin_first+ "\t" + pinyin_full+"\t"+abbreviate);
                
            }
            rs.close();
            con.close();
        } catch (ClassNotFoundException e) {
            System.out.println("Sorry,can`t find the Driver!");
            e.printStackTrace();
        } catch (SQLException e) {
            //数据库连接失败异常处理
            e.printStackTrace();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        } finally {
            System.out.println("数据库数据成功获取！！");
        }
    }
}

