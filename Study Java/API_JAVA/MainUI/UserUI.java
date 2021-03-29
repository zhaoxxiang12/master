package MainUI;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

public class UserUI {
    static Scanner sc = new Scanner(System.in);

    /**
     * 模拟用户登录界面输入
     *
     * @return
     */
    public static User loginUI() {
        System.out.println("-------------欢迎进入登录界面-----------");
        System.out.println("请输入用户名");
        String username = sc.next();
        System.out.println("请输入密码");
        String password = sc.next();
        if (username != null || "".equals(username) || password != null || "".equals(password)) {
            return new User(username, password);
        }
        return null; //表示未找到
    }

    public static boolean login(User user) {
        if (user == null) {
            return false;
        }
        //登录前先反序列化
//        try {
//            FileUtil.noSerialize();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        for (User u : DB.list) { //DB.list和文件中序列化是同步的,因此无需再反序列化
            if (user.getUname().equals(u.getUname()) && user.getPassword().equals(u.getPassword())) {
                return true;
            }
        }
        return false;
    }

    public static User registUI() {
        System.out.println("-------------欢迎进入注册界面-----------");
        System.out.println("请输入用户名");
        String username = sc.next();
        String password = "";
        for (; ; ) {
            System.out.println("请输入密码");
            password = sc.next();
            System.out.println("请输入确认密码");
            String confirmPassword = sc.next();
            if (password != null && password.equals(confirmPassword) && !"".equals(password)) {
                break;
            }
            System.out.println("两次密码输入不一致");
        }
        if (username != null && !"".equals(username)) {
            return new User(username, User.number, password); //模拟出Id自动增长
        }
        return null;
    }

    /**
     * 业务逻辑错误(用户名不能重复)
     *
     * @param user
     * @return
     */
    public static boolean regist(User user) {
        if (user == null) {
            User.number--;
            return false;
        }
        //1.判断集合中是否存在此用户
        boolean flag = containsUname(user.getUname());
        if (!flag) {//用户名不存在,可以注册
            return DB.addUser(user);
        }
        //2.若不存在就创建
        User.number--;
        return false;
    }

    /**
     * 判断用户名是否存在
     *
     * @param uname
     * @return
     */
    private static boolean containsUname(String uname) {
        ArrayList<User> list = DB.list; //注册用户的集合
        System.out.println("测试：" + list);
        for (User u : list) {
            if (uname.equals(u.getUname())) {
                return true;
            }
        }
        return false;
    }

    public static void lookUser() {
        int count = 0;
        for (User user : DB.list) {
            System.out.println(user);
            count++;
        }
        System.out.println("共有" + count + "个用户");
    }
}
