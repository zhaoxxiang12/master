package ArrayFile;
import java.util.Arrays;
public class ArrayReverse {
    /**
     * 数组倒序
     */
    public static void main(String[] args) {
        int [] arr = {789,234,32,2,32,71,65,78,890,534};
//        for(int i = 0;i<arr.length-1;i++){//控制比较次数
//            for(int j = 0;j<arr.length-1;j++){
//                int temp = 0;
//                if(arr[j]<arr[j+1]){
//                    temp = arr[j];
//                    arr[j]=arr[j+1];
//                    arr[j+1]=temp;
//                }
//            }
//        }
////        System.out.println(arr);//打印出来是数组的地址
////        for (int i = 0;i<arr.length;i++){ //循环遍历打印数组
////            System.out.println(arr[i]);
////        }
//        System.out.println(Arrays.toString(arr));//打印出来是一个数组列表
//        System.out.println(arr.getClass().getTypeName()); // 获取变量类型
        /**
         * 数组倒序代码
         */
        int[] arr4 = {11,22,33,77,88,99,101,102,103};
        System.out.print("\n原始数组元素为:");
        System.out.println(Arrays.toString(arr4));
        for(int start=0,end=arr4.length-1; start<=end;start++,end--){
            int tmp = arr4[start];
            arr4[start] = arr4[end];
            arr4[end] = tmp;
        }
        System.out.print("逆序排列后，新数组的元素：\n");
        System.out.println(Arrays.toString(arr4));
    }

}
