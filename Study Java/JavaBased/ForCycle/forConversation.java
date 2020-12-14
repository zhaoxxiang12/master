package ForCycle;

public class forConversation {
    public static void main(String[] args) {
//        for (int i = 0;i<=10;i++){
//            System.out.println(i);
//        }
        /**
         * 99乘法表
         *
         */
//        for (int i = 1; i <= 9; i++) { // 外层循环用于打印乘法表的乘数
//            for (int j = 1; j <= i; j++) {// 内层循环用于打印被乘数
//                int sum = i * j;// 定义sum用于计算外层循环及内层循环两个数的积
//                System.out.print(j  +
//                        "×" + i + "=" + sum + "" + "\t");// 控制台输出
//            }
//            System.out.println();// 换行
//
//        }
        /**
         * 输入一行字符，分别统计出英文 数字 空格 和其他字符
         *
         */
//        String str = "shanghai123上海";
//        for (int i = 0;i<str.length();i++){
//            System.out.println(str.charAt(i));
//        }
//        String str = "asdasv &**@*# dasd上海 20137";
//        int letter = 0;
//        int number = 0;
//        int chinese = 0;
//        int other = 0;
//        int backSpace= 0;
//        for (int i = 0; i < str.length(); i++) {
//            char ch = str.charAt(i);
//            if (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z') {//字母
//                letter++;
//            } else if (ch >= '0' && ch <= '9') {//数字
//                number++;
//            } else if (ch >= '\u4E00' && ch <= '\u9FA5') {//java中的汉字采用Unicode编码
//                chinese++;
//            }else if(ch==' '){//空格
//                backSpace++;
//            }
//
//            else {//其他字符
//                other++;
//            }
//        }
//        System.out.println("字母"+letter);
//        System.out.println("数字"+number);
//        System.out.println("中文"+chinese);
//        System.out.println("空格"+backSpace);
//        System.out.println("其他"+other);
        /**
         * 字母大小写互转
         *
         */
        String str2 = "asdasdaaAAA";
        String str3 = " ";
        for (int i = 0;i<str2.length();i++){
            char ch = str2.charAt(i);
            if (ch>='a'&&ch<='z'){
                ch = (char) (ch-32);
            }else if(ch>='A'&&ch<='Z'){
                ch = (char) (ch+32);
            }
            str3 +=ch; // 拼接新的字符串
        }
        System.out.println(str3);
    }
}
