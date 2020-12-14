package WhileDemo;

public class k {
    public static void main(String[] args) {
        int row = 0;
        while (row<5){
            int col=0;
            while (col<5){
                System.out.println("*");
                col++;
            }
            System.out.println("*");
            row++;
        }
    }
}
