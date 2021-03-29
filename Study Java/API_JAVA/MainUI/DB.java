package MainUI;

import java.io.IOException;
import java.util.ArrayList;

public class DB {
    //数据库一定要所有人都一样
    public static ArrayList<User> list = new ArrayList<User>();
    //静态代码块只会初始化一次(类加载的时候),用来解决没有注册就直接登录的情况
    static {
        try {
            FileUtil.noSerialize(); //反序列化
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static boolean addUser(User user){
        if (user ==null){
            return false;
        }
        list.add(user); //将新注册的用户写入到集合中
        return FileUtil.serialize2(list); //将更新后的用户写入到文件中
    }
}
