package doWhileCycle;

public class doWhile {
    public static void main(String[] args) {
        /**
         *
         * 语法
         * do{
         *     循环体（重复执行的代码）
         * }while{
         *     （循环条件）;
         * }
         * while 循环体 先判断后执行 条件为假 循环不进入
         *
         * do....while ..... 先执行后判断 在正常开发中很少使用
         *
         */
        int x= 10;
        int y = 0;
//        do{
//            if(x-->y++){//   10>5
//                break;
//            }
//        }while (y>0);
//        System.out.println(x); // 9
//        System.out.println(y); // 6
        do{
            if(--x>++y){ // 9>1  第一次
                x/=2;   // 4     第一次
            }
        }while (y%2==0);
        System.out.println(x); // 9
        System.out.println(y); // 6
    }
}
