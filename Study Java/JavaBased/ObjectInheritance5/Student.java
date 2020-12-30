package ObjectInheritance5;

/**
 * 静态域中的属性和方法在类加载的时候就已经初始化了
 * <p>
 * 静态的在方法区初始化，而非静态的在对象创建后的堆中被初始化
 * static优先于this存在
 */

public class Student {
    //    int num =0;//学生数量为0,对象变量不能共享，只能自己使用
    public static int num = 0;  // 静态：含义共享变量（这个类的所有对象都共享这一个变量
    private String name;

    public Student() {
        super();
        num++;
    }

    //成员方法/对象方法
    public void count() {
        System.out.println("创建了" + num + "个学生对象");
        System.out.println(this.name);
    }

    public static void say() {
        System.out.println("创建了" + num + "个学生对象");
//        System.out.println(this.name);//static 不能和this共存（静态优先于this加载,类加载的时候就创建了）
        // 重点：静态的方法中只能使用静态的变量
    }

    public static int[] bubbleSort(int[] arr) {
        for (int i = 0; i < arr.length-1; i++) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;

            }
        }

        return arr;
    }

}
