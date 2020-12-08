package javaDate;

public class work3 {
    public static void main(String[] args) {
        // 判断回文字符串，如rotor，从前往后读，与从后往前读结果是一样的,即都是相同的字符串
        boolean huiwen = isHuiWen("123321");
        System.out.println(huiwen ? "是回文数" : "不是回文数");
    }
   public static boolean isHuiWen(String str){
        if (str == null) {
            return false;
        }
        for(int left=0,right=str.length()-1;left<right;left++,right--){
            if(str.charAt(left)!=str.charAt(right)){
                return false;
            }
        }
        return true;
   }

}