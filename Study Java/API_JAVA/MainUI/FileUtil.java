package MainUI;

import java.io.*;
import java.util.ArrayList;

/**
 * 文件工具类
 */
public class FileUtil {
    public static void main(String[] args) throws IOException {
//        ArrayList<User>list = new ArrayList<User>();
//        list.add(new User());
//       boolean serialize =  serialize(list);
//        System.out.println(serialize);
         noSerialize();
         System.out.println(DB.list);
    }

    /**
     * 2.反序列化得到用户集合对象
     *
     * @return
     */
    public static void noSerialize() throws IOException {
        File file = new File("API_JAVA/MainUI/User.txt");
        if (!file.exists()){
            file.createNewFile();
            return;
        }
        //反序列化(将磁盘文件读取到内存中:对象字节输入流)
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file));) {
            Object obj = null;
            while ((obj = ois.readObject()) != null) {
                //从文件的众多对象中找出集合对象
                if (obj instanceof ArrayList) {
                    DB.list = (ArrayList<User>) obj;
                }
            }
        } catch (EOFException e) {
            return;
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    /**
     * 1.序列化用户集合
     *
     * @param list
     * @return
     */
    public static boolean serialize(ArrayList<User> list) {
        if (list == null || list.size() == 0) {
            return false;
        }
        ObjectOutputStream oos = null;
        //开始序列化(内存写入到磁盘的过程：对象字节输出流)
        //这个异常的捕获机制是JDK1.8之前使用的
        try {
            oos = new ObjectOutputStream(new FileOutputStream("API_JAVA/MainUI/User.txt"));
            oos.writeObject(list);
            oos.writeObject(null); //以后可能会读取到文件末尾(EOFException)
            return true;
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                //释放资源
                oos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        return false;
    }

    /**
     * 捕获异常JDK1.8之后新特性:try(){}catch(){} 自动释放流
     *
     * @param list
     * @return
     */

    public static boolean serialize2(ArrayList<User> list) {
        if (list == null || list.size() == 0) {
            return false;
        }
        //开始序列化(内存写入到磁盘的过程：对象字节输出流)
        //这个异常的捕获机制是JDK1.8之后使用的
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("API_JAVA/MainUI/User.txt"));) {
            oos.writeObject(list);
            oos.writeObject(null); //以后可能会读取到文件末尾(EOFException)
            return true;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }
}
