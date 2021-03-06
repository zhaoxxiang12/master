package abstractObject2;

public abstract  class Door {
    private String brand; //品牌
    private String type; // 型号

//    public void open() {
//        System.out.println("钥匙开锁");
//    }
//
//    public void close() {
//        System.out.println("用钥匙上锁");
//    }
    public Door(){
        super();
    }
    public Door(String brand, String type){
        this.brand = brand;
        this.type = type;
    }
    // 没有方法体的方法：抽象方法
    // 什么时候用：当父类不确定子类行为具体是什么的时候，就要求父类不实现此方法，而是交给子类去具体实现
    public abstract void abstractOpen();
    public abstract void abstractClose();
    @Override
    public String toString(){
        return brand+":"+type;
    }
}
