package ObjectHomework;

public class MyMath {
    //求任意数的阶乘
    public String factorial(int num) { //任意数的阶乘
        long result = 1;
        if (num == 0) {
            return num + "的阶乘是1";
        } else if (num < 0) {
            return num + "是负数，没有阶乘";
        } else {
            for (int i = 1; i <= num; i++) {
                result *= i;
            }
        }
        return num + "的阶乘是" + result;
    }

    // 求任意数是否为水仙花数
    public boolean DaffodilNumber(int num) {
        if (num < 100 || num > 1000) {
            return false;
        }
        int geWei, shiWei, baiWei;
        geWei = num % 10;
        shiWei = num / 10 % 10;
        baiWei = num / 100;
        return geWei * geWei * geWei + baiWei * baiWei * baiWei + shiWei * shiWei * shiWei == num;
    }
    // 数组倒序的方法
    public  void ArrayReverse(double [] arr){
        if(arr==null){//用来防护空指针异常
            System.out.println("数组为空");
            return;//方法的返回值void（空），不代表方法没有返回值，而是返回了一个空而已

        }
        for(int left=0,right =arr.length-1;left<right;left++,right--){
            double temp = arr[left];
            arr[left]=arr[right];
            arr[right]=temp;
        }
    }
}
