package abstractObject4;

public class NotebookComputer {
    private String brand;
    public NotebookComputer(){
        super();
    }
    public NotebookComputer(String brand){
        super();
        this.brand = brand;
    }
    public void Equipment(USBEquipment usbEquipment){
        System.out.println(brand+"笔记本电脑,"+"USB设备"+usbEquipment.getName()+"接入成功");
    }

    public  void TurnOff(){
        System.out.println(brand+"正在关机");
    }
    public void TurnOn(){
        System.out.println(brand+"正在开机");
    }
}
