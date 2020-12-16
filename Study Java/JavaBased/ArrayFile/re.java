package ArrayFile;


import java.util.Arrays;

public class re {
    public static void main(String[] args) {
        int[] arr = {2, 1, 1, 1, 1, 1,};
        int max = arr[0];
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr.length - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    max = arr[j];
                }
            }
        }
        System.out.println(max);

    }
}
