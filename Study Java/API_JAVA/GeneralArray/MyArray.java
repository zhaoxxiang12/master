package GeneralArray;

import java.util.Random;

/**
 * 【通用】数据工具，增删改查，常用方法
 *  泛型只是在编译期有效,在运行期失效
 * @author zhaoxiaoxiang
 * @version 1.0.0
 */
public class MyArray {

    private static final int default_capacity = 10;//数组的默认容量为10(默认长度)
    private int capacity; // 自定义容量
    private int size; // 表示从零开始

    //    private String [] object = new String[default_capacity]; // 不推荐此方法
    private Object[] array; // 自定义数组   自定义数组底层的构建数组

    public MyArray() {
        super();
        capacity = default_capacity;
        array = new Object[default_capacity];// 无参创建出的自定义数组长度就是10
    }

    public MyArray(int capacity) {
        super();
        this.capacity = capacity;
        array = new String[capacity];
    }

    /**
     * 1.数组中添加元素
     */
    public boolean add(Object obj) {
        // 判断容量问题并扩容
        ensureCapacity(size + 1);//表示先判断再存放下个元素前是否需要先扩容
        //将元素存入数组中
        array[size++] = obj; //将新的元素存入数组中
        return true;
    }

    /**
     * 扩容的判断
     *
     * @param index 现在要存放的元素个数(实际元素个数)
     */
    private void ensureCapacity(int index) {
        if (capacity * 0.75 <= index) {
            grow();
//            System.out.println("数组长度为"+array.length);
        }
    }

    /**
     * 正真的扩容
     */
    private void grow() {
        //1.新数组的容量扩容1.5倍
        capacity = capacity + (capacity >> 1); //新数组的容量  >>1 表示右移一位
        //2.创建新数组
        Object[] newArray = new Object[capacity];
        //3.将以前的旧数组的全部依次拷贝到新数组中
        for (int i = 0; i < size; i++) { // index实际上就是真正的元素个数(有几个元素就copy几个元素)
            newArray[i] = array[i];
        }
        //4.将新的数组对象指向array变量
        array = newArray; // 将新的数组地址赋值给旧数组
    }

    public String display() { // 展示数组中已存在的元素,为空时显示为[]
        StringBuilder builder = new StringBuilder();
        builder.append("[");
        for (int i = 0; i < size; i++) {//index表示数组中真实存在的元素个数
            builder.append(array[i]);
            if (i != size - 1) {
                builder.append(",");
            }
        }
        builder.append("]");
        return builder.toString();
    }

    /**
     * 通过指定的索引来获取这个索引处的值
     *
     * @param index
     * @return
     */
    public Object getArray(int index) {
        //1.检查是否越界
        rangeCheck(index);
        return array[index];
    }

    /**
     * 检查索引是否越界,越界则抛出异常
     *
     * @param index
     */
    private void rangeCheck(int index) {
        if (index < 0 || index >= array.length) {
            throw new ArrayIndexOutOfBoundsException(); //手动抛出数组索引越界异常
        }
    }

    /**
     * 3.根据指定索引来更新此处元素的值
     *
     * @param index 索引
     * @param value 待更新的值
     * @return
     */
    public String updateArray(int index, String value) {
        rangeCheck(index); // 检查是否越界
        array[index] = value; // 使用新值将旧值覆盖
        return array.toString();
    }

    /**
     * 每删除一个元素,元素真实的个数就会减一,但此时数组的长度是不变的,索引会重新排列
     * 4.根据索引删除元素
     *
     * @param index 索引
     * @return 被删除的元素
     */
    public Object remove(int index) { //被删除元素后的元素会整体向前移动
        rangeCheck(index);
        Object deleteObj = array[index]; // 即将要删除的元素
        for (int i = index; i < size; i++) {
            array[i] = array[i + 1];
        }
        if (size < index) {
            size--;
        } else {
            array[index] = null;
        }
        return deleteObj;
    }

    /**
     * 5.返回数组中真实元素个数
     *
     * @return
     */

    public int size() {
        return size;
    }

    /**
     * 6.返回当前元素在数组中第一次出现的索引
     *
     * @param string
     * @return
     */
    public int indexOf(String string) {
        if (string == null) {
            return -1;
        }
        for (int i = 0; i < size; i++) {
            if (string.equals(array[i])) {
                return i;
            }
        }
        return -1;
    }

    /**
     * 判断数组中是否存在真实的元素
     *
     * @return true:表示空 false:非空
     */
    public boolean isEmpty() {
        return size == 0;
    }

    /**
     * 判断此元素是否在数组中
     *
     * @param value
     * @return 存在 true 不存在 false
     */
    public boolean contains(String value) {
        return indexOf(value) != -1;
    }

    public int count(String value) {
        int count = 0;
        if (value == null) {
            return 0;
        }
        for (int i = 0; i < array.length - 1; i++) {
            if (value.equals(array[i])) {
                count++;
            }
        }
        return count;
    }

    /**
     * 随机打乱数组中的元素
     */
    public void shuffle() {
        Random random = new Random();
        int randomIndex = random.nextInt(size);
        swap(randomIndex);
    }

    /**
     * 交换值
     *
     * @param index
     */
    public void swap(int index) { // index 表示随机索引
        for (int i = 0; i < size; i++) {
            Object temp = array[i];
            array[i] = array[index];
            array[index] = temp;
        }
    }

    /**
     * 倒转数组元素
     */
    public void reverse() {
        for (int left = 0, right = size - 1; left < right; left++, right--) {
            Object temp = array[left];
            array[left] = array[right];
            array[right] = temp;
        }
    }
}
