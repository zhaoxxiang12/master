package ArrayFile;

public class ArrayDemo3 {
    public static void main(String[] args) {
        /**
         * 数组遍历
         */
//        int [] arr = {1,2,3,4,5,6,7};
//        for(int i = 0;i<arr.length;i++){
//            System.out.println(arr[i]);
//    }
        // 练习：求数组中的最大值和最小值
//        int [] arr = {23,89,7897,456,15,65};
//        int max=arr[0];
//        int min = arr[0];
//        for (int i = 1;i<arr.length;i++){
//            if(arr[i]>max){
//                max=arr[i];
//            }
//            if (arr[i]<min){
//                min = arr[i];
//            }
//        }
//        System.out.println("最大值"+max);
//        System.out.println("最小值"+min);
        // 冒泡排序
        int[] brr = {23, 89, 7897, 456, 15, 65};
        for (int i = 0; i < brr.length - 1; i++) {//控制比较次数
            for (int j = 0; j < brr.length - 1; j++) {//防止索引越界
                if (brr[j] > brr[j + 1]) {
                    int temp = brr[j];
                    brr[j] = brr[j + 1];
                    brr[j + 1] = temp;
                }
            }
        }
        // 遍历数组输出结果
        for (int i = 0;i<brr.length;i++){
            System.out.println(brr[i]);
        }

    }
}
