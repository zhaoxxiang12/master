package javaDate;

public class work8 {
    public static void main(String[] args) {
        for(int i = 1;i<=9;i++){ // 行
            for (int j =1;j<=i;j++){ //列
               System.out.print(String.format("%dx%d=%d\t",j,i,i*j));
            }
            System.out.println();
        }
    }
}
