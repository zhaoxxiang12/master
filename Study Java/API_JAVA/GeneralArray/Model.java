package GeneralArray;

/**
 * 泛型的替换原则:一改全改
 * @param <T>
 */
public class Model<T> {
    private T obj;
    private T[] array=(T[]) new Object[12];
    // 无法直接创建出泛型数组的,必须通过Object创建后强转
    public void test(T obj) {  // 虽然通用,但是下转型需要判断后强转后才能使用

    }

    public T returnObj() {
        return obj;
    }

    public T[] getArray() { //表示泛型数组
        return array;
    }

    //特殊情况
    public <E> Object info(E obj){
        // <E> 指的是声明新的泛型,当方法的泛型与类的泛型不一致时
        //<E> E 中的E就是方法的返回类型
        // info(E object)中的E就是形参类型
        return obj;
    }
//    public void test(String string){
//
//    }
//    public void test(int number){
//
//    }
//    public void test(double obj){
//
//    }
}
