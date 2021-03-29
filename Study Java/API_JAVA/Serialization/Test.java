package Serialization;

import MainUI.User;


import java.io.*;

public class Test {
    public static void main(String[] args) throws FileNotFoundException, IOException, ClassNotFoundException {
        反序列化();
    }

    public static void 反序列化() throws IOException, ClassNotFoundException {
        //1.想要读取文件中的对象(将文件中的内容恢复成内存中的user对象)
        //反序列化:将磁盘中或者数据库中的数据回复成内存中的对象的过程
        //反序列化(读)ObjectInputStream
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream("API_JAVA/Serialization/db_user.txt"));
        //开始反序列化(边度边恢复成对象)
        Object object = ois.readObject();//一次读取一个对象
        if (object instanceof User) {
            User u = (User) object;
            System.out.println(u);
        }
        //java.io.InvalidClassException  local class incompatible: stream classdesc serialVersionUID= -8863655789873693830,
        // local class serialVersionUID = -3389860049062427664
        /**
         * serialVersionUID重要性
         * 序列化后如果类发生了变化,则在反序列化的时候以前版本和现在新的版本编号就不能匹配了  InvalidClassException
         */
//        Object object2 = ois.readObject();
        //java.io.EOFException EOF：END OF FILE 读取到文件末尾了(反序列化时专用异常)
        ois.close();
    }

    public static void 序列化() throws IOException {
        User user = new User("admin", 1L, "123");
        //user是Java中的对象
        //对象序列化:将内存中的对象永久的保存在磁盘或者数据库的过程中(持久化)
        //序列化:对象字节输出流ObjectOutStream
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("API_JAVA/Serialization/db_user.txt"));
        oos.writeObject(user);//使用对象流写出对象到write
        System.out.println("对象保存成功");
        oos.close();
        //java.io.NotSerializableException User对象未被序列化
    }
}
