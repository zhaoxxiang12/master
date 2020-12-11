package StringOperate;

public class sanJiao {
    public static void main(String[] args) {
        /**
         * for 循环打印
         */
//        for (int x = 1; x<=9; x++) {
//            for (int y = 1; y <= x; y++) {
//
//                System.out.print( y + "*" + x + "=" + x*y + '\t' );
//            }
//
//            System.out.println();
//        }
        /**
         * while 循环打印
         */
//        int i = 1;
//        int j = 1;
//        while (i <= 9) {
//            j = 1;
//            while (j <= i) {
//                System.out.print(j + "×" + i + "=" + i * j + "\t");
//                j++;
//            }
//            System.out.println();
//            i++;
//        }
        /**
         *
         *打印直角三角形
         */
//        int i = 1;
//        int j = 1;
//        while (i <= 5) {
//            j = 1;
//            while (j <= i) {
//                System.out.print("* ");
//                j++;
//            }
//            System.out.println();
//            i++;
//        }
        /**
         *
         *打印5*5正方形
         */
        int i = 1;
        int j = 0;
        while (i <= 5) {
            j = 1;
            while (j <= 5) {
                System.out.print("* ");
                j++;
            }
            System.out.println();
            i++;
        }
    }

}

