package PackingFunction;

public class RunEncap {
    public static void main(String[] args) {
        EncapTest encp = new EncapTest();
        encp.setName("ZXX");
        encp.setAge(26);
        encp.setIdNum("1");
        System.out.println("name:" + encp.getName() + " " + "Age:" + encp.getAge() + " " + "Id:" + encp.getIdNum());
    }
}
