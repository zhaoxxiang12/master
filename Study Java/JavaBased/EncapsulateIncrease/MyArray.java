package EncapsulateIncrease;

public class MyArray {
    private int capacity = 10; // 数组的初始容量为10（长度）
    private String[] str = null;
    private int index = 0;

    public MyArray() {
        super();
        str = new String[capacity];
    }

    public MyArray(int capacity) {
        super();
        this.capacity = capacity;
        str = new String[capacity];
    }

    public void add(String value) {
        if (index < str.length) {
            str[index++] = value;
        }
    }
    public  String[] getStr(){
        return str;
    }
}
