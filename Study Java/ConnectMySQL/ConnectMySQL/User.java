package ConnectMySQL;

import java.sql.*;
import java.util.ArrayList;

public class User {
    private int id;
    private String name;
    private int age;
    private String sex;

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
        Statement statement = connection.createStatement();
        //4.查询
        ResultSet rs = statement.executeQuery("select * from user ");
        //创建集合容器
        ArrayList<User> al = new ArrayList<>();
        //5.解析对象
        while (rs.next()) {
            int id = rs.getInt("id");
            String name = rs.getString("name");
            int age = rs.getInt("age");
            String sex = rs.getString("sex");
            //创建User对象
            User user = new User(id, name, age, sex);
            //将user对象存储到集合容器中
            al.add(user);
        }
        //释放资源
        rs.close();
        statement.close();
        connection.close();

        //遍历集合容器
        for (User user : al) {
            System.out.println(user);
        }
    }

    public User() {

    }

    public User(int id, String name, int age, String sex) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", sex='" + sex + '\'' +
                '}';
    }
}
