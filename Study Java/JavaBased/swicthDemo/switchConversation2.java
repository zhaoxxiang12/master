package swicthDemo;

public class switchConversation2 {
    public static void main(String[] args) {
        /**
         *
         * switch 穿透
         *  3 4 5春季
         *  7 8 6 夏季
         *  10 11 9 秋季
         *  12 1 2 冬季
         *
         *  case 在执行过程中，只有遇到break才会停止并退出选择
         *  case 在执行过程中，如果没有遇到break则会执行下个选择
         *
         *  default所有case都不满足的情况下才会进入
         *  只要case没有break则会往下穿透
         *  default 理论上可以放在任意位置，但在实际的开发中放在最后
         *  除了业务需要手动穿透之外，以后所有的case都要break
         */
        int month = 3;
        switch (month) {
            case 3:
            case 4:
            case 5:
                System.out.println("春");
                break;
            case 6:
            case 7:
            case 8:
                System.out.println("夏");
                break;
            case 9:
            case 10:
            case 11:
                System.out.println("秋");
                break;
            case 12:
            case 1:
            case 2:
                System.out.println("冬");
                break;
        }
    }
}
