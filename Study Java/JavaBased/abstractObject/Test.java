package abstractObject;

/**
 * 1.抽象类不能直接被创建，但是他的【子类】可以创建对象
 */
public class Test {
    public static void main(String[] args) {
        pushDoor pushDoor = new pushDoor("东风", "21D");
        System.out.println(pushDoor.toString());
        liftDoor liftDoor = new liftDoor("三菱", "986XXX");
        liftDoor.abstractOpen();
        liftDoor.abstractClose();
        SecurityDoor securityDoor = new SecurityDoor("盼盼", "9865XX");
        securityDoor.abstractClose();
        securityDoor.abstractOpen();



    }
}
