package ThreadWork;

/**
 * 5辆火车过山洞,1s过一个
 * 分析：每辆火车就是一个独立的线程
 * 山洞是同一个
 */
public class Train extends Thread{
    @Override
    public void run() {
        //火车过山洞的方法
        System.out.println(getName()+"正在过山洞");
        try {
            Thread.sleep(1000);
        }catch (InterruptedException e){
            e.printStackTrace();
        }
    }
    public Train(String name){
        super(name);
    }
}
