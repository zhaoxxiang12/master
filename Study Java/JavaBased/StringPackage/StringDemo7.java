package StringPackage;

public class StringDemo7 {
    public static void main(String[] args) {
        String s1 = "baidu_huawei_tengxun";
        //字符串替换：将三个_替换成，  方法 str.replace(oldChar,newChar)
        //String replace = s1.replace("_","\u0000")  建议使用
        System.out.println(s1.replace("_",","));
        System.out.println(s1.replace("_"," "));
        System.out.println(s1.replace("tengxun","taobao"));


        // 2. 字符串分割
        String s2 = "18781544#123456*789456";
        String [] split = s2.split("#"); // # 是分隔符，不会放在数组中
        System.out.println(split);
        System.out.println(split[0]);
        System.out.println(split[1]);
        
        String http = "www.baidu.com/s?ie=utf-8";
        String[] split2 = http.split("\\?");
        System.out.println(split2[0]);
        System.out.println(split2[1]);
    }
}
