package MainUI;

import java.io.Serializable;
import java.util.Objects;

/**
 * 用户实体类entity
 * Serializable 序列化的标记注解
 */
public class User implements Serializable {
    private static final long serialVersionUID = 1;//保证序列化和反序列化的版本一致(面试题)
    private String uname;
    private long id;
    private String password;
    public static long number ;
    private Integer age;

    static {
        number = DB.list.size()+1;
    }

    public User() {
        super();
    }

    public User(String uname, long id, String password) {
        this.uname = uname;
        this.id = id;
        this.password = password;
        number++;
    }

    public User(String uname, String password) {
        this.uname = uname;
        this.password = password;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "uname='" + uname + '\'' +
                ", id=" + id +
                ", password='" + password + '\'' +
                '}';
    }

}
