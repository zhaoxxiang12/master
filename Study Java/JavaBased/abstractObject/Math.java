package abstractObject;

/**
 * 继承：子类继承父类，共享父类菲斯有的成员(属性、方法) 同时自己也可以做扩展
 * 单继承：缺陷，有且只有一个直接父类，不能同时用多个直接父类(只能继承一个父类)
 * 多层继承：但是可以有多个父类
 */

public class Math extends Teacher {
    private int age;

    // 抽象方法的重写
    @Override
    public void teaching() {
        System.out.println("上数学课");
    }


    public Math(){
        super();
    }
    public Math(String name,String tno){
        super(name,tno);
    }

    public  Math(String name,String tno,int age){
        super(name,tno);
        this.age = age;
    }

    // 所有方法也可以重写(前提:存在子父类关系，通过子类来重写父类的方法)

    @Override
    public void info() {
        // 保留官网对教师的介绍，此外还需要说明教师的年龄
        super.info();  // 调用父类的方法
        System.out.println(super.getName()+"今年"+age+"岁");  // 子类做扩展
    }

    /**
     * 求任意数的阶乘
     * @param num
     * @return
     *
     * 递归：方法自身调用自身的一种行为
     * 问题：容易出现死循环
     * 解决死循环问题：递归必须要有自己的结束条件
     */
    public  long jieCheng(int num){
        if(num<0){
            return -1;
        }
        if(num==0||num==1){
            return 1; // num==1 结束递归用的  用于提高效率，方法返回用的
        }
        return num*jieCheng(num-1);

    }

    /**
     * 求斐波拉契数列
     * @param month
     * @return
     *
     *   1 1 2 3 5 8 13
     *   递归求斐波拉契数列第n项值(第n个月兔子的对数)
     *
     *   递归实质：方法自身在栈内做循环
     *   所有结果计算完成后才会弹栈
     */

    public long feiBo(int month){
        if(month ==1 || month==2){
            return 1;
        }
        if(month<=0){
            return -1;
        }
        return month+feiBo(month-1)+feiBo(month-2);
    }
}
