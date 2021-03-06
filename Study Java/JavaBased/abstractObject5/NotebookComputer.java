package abstractObject5;

public class NotebookComputer {
    private String brand;
    private float price;

    public NotebookComputer() {
        super();
    }

    public NotebookComputer(String brand, float price) {
        super();
        this.brand = brand;
        this.price = price;
    }

    public void TurnON() {
        System.out.println(brand + "正在开机");
    }

    public void TurnOff() {
        System.out.println(brand + "正在关机");
    }

    /**
     * 电脑运行设备的方法
     */
    public void work(USB usb) {
      usb.start();
      usb.run();
      usb.stop();
    }
}
