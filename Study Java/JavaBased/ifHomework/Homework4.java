package ifHomework;

public class Homework4 {
    public static void main(String[] args) {
        //分别取12345的个位、十位、百位、千位、万位打印到控制台
        int num = 12345;
        int Wanwei = num / 10000;
        int qianWei =num/1000%10 ;
        int baiWei = num /100%10;
        int shiWei = num /10%10 ;
        int geWei = num %10;
        System.out.println(Wanwei);
        System.out.println(qianWei);
        System.out.println(baiWei);
        System.out.println(shiWei);
        System.out.println(geWei);

    }
}
