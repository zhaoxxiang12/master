package ArrayHomework;


public class Homework2 {
    public static void main(String[] args) {
//        int [ ] arr = {1,4,8,9,10,69};
//        int max;
//        max = arr[0];
//        int min =arr[0];
//        for (int i = 1;i<arr.length;i++){
//            if(arr[i]>max){
//                max=arr[i];
//            }
//            if (arr[i]<min){
//                min = arr[i];
//            }
//        }
//        System.out.println("最大值："+max);
//        System.out.println("最小值："+min);
        String[] fruits = {"苹果", "火龙果", "苹果", "香蕉", "桃子", "菠萝", "梨", "苹果"};
        int max = 0;
        String name = null;
        for (int i = 0; i < fruits.length; i++) {
            int count = 0;//每次统计后清零
            String fruitName = fruits[i]; //新的水果名
            for (int j = 0; j < fruits.length; j++) {
                if (fruitName == fruits[j]) {
                    count++;
                }
            }
            if (max < count){
                max = count;
                name =fruitName;
            }
        }
        System.out.println("出现次数最多的水果是"+name+"，次数为"+max+"次");
    }
}