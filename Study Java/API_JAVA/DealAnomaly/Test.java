package DealAnomaly;

/**
 * 异常：程序在运行过程中出现的一切不正常的现象
 * 危害：终止程序的运行
 * 危害程序:java中吧【异常】分为:Exception（异常）；Error(错误)
 * Error(错误)是严重的级别的异常,是程序无法控制的(一定在设计的时候不要出现异常)
 * HeapOverFlowError  StackOverFlowError虚拟机中断
 * <p>
 * 重点:异常的处理机制
 * 捕获机制
 * try{
 * //有可能出现的异常的代码
 * }catch(根据异常类型 变量){
 * //根据不同类型的异常来做不同的应对策略
 * }finally{
 * //无论是否发生异常,这个代码块的内容都会执行
 * //作用:释放资源
 * }
 */
public class Test {
    public static void main(String[] args) {
        try {
            int i = 10 / 0; //运行期产生的异常(非受查异常)  java.lang.ArithmeticException: / by zero
            // 受查异常:语法错误
        } catch (ArithmeticException e) {
            e.printStackTrace();//打印异常在栈中的轨迹
        }
    }
}
