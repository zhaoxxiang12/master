package MainUI;

import java.util.Scanner;

public class LoginRegistCase {
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        init();
    }

    public static void init() {
        System.out.println("欢迎");
        System.out.println("1.登录");
        System.out.println("2.注册");
        System.out.println("3.查看所有用户");
        System.out.println("4.返回主界面");
        System.out.println("请选择");
        char ch = sc.next().charAt(0);
        choose(ch);
    }

    public static void choose(char ch) {
        switch (ch) {
            case '1':
                boolean flag2 = UserUI.login(UserUI.loginUI());
                if (flag2) {//登录成功
                    System.out.println("模块正在开发中.............");
                    init();
                } else {//登录失败
                    System.out.println("用户名或者密码错误");
                    System.out.println("确定需要重试码？y/n");
                    char cho = sc.next().charAt(0);
                    if (cho == 'y') {
                        System.out.println("欢迎下次光临");
                        choose('y');
                    }
                    if (cho == 'n') {
                        init();
                    }
                    choose('1');
                }
                break;
            case '2':
                boolean flag1 = UserUI.regist(UserUI.registUI());
                if (flag1) {//注册成功
                    System.out.println("注册成功");
                    choose('1');
                } else {//注册失败，就继续注册
                    System.out.println("用户名已存在");
                    choose('2');
                }
                break;
            case '3':
                UserUI.lookUser();
                init();
                break;
            case '4':
                System.out.println("确定需要退出码？y/n");
                char c = sc.next().charAt(0);
                if (c == 'y') {
                    System.out.println("欢迎下次光临");
                    System.exit(0);
                }
                if (c == 'n') {
                    init();
                }
                break;
            default:
                break;


        }
    }
}
