package javaDate;

public class work9 {
    public static void main(String[] args) {
        //从字符串中提取所有数字，然后按出现的顺序组成一个数字
        String str = "12wqe12q1weq99";
        // char [] ch = new char[str.length()];
        StringBuilder builder = new StringBuilder();
        for (int i= 0;i<str.length();i++){
            char ch = str.charAt(i);
            if(ch>='0' && ch<='9'){
                builder.append(ch);


            }

        }
        long result = Long.parseLong(builder.toString());
        System.out.println(result);
    }
}
