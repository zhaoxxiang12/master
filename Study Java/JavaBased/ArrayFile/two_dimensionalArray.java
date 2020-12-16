package ArrayFile;

public class two_dimensionalArray {
    public static void main(String[] args) {
        /**
         * 二维数组就是矩阵  一个数组中的元素他又放了一个数组
         * [3][3] 意思是3X3的数组
         */
        // 1.二维数据的创建形式
        int[][] arr = new int[3][4];//代表3*4的矩阵 长度为3
        int[][] arr2 = new int[3][]; // 3*N 矩阵   长度为3
        int[] brr[] = new int[3][]; // 3*N 矩阵 长度为3
        int[] crr[] = new int[][]{}; // 数组长度为0
        int brr2 [][] = {};//元素指向为空，不能使用
//        System.out.println(arr.length);
//        System.out.println(arr2.length);
//        System.out.println(crr.length);
//        System.out.println(brr.length);
        int [][] bty = {{1,2,3},{4,5,6}};
//        System.out.println(bty.length);//长度为2
        System.out.println(bty[0]); //打印出来是一个地址
        System.out.println(bty[0][1]);//打印结果是2
    }
}
