package abstractObject4;

public class Test {
    public static void main(String[] args) {
        NotebookComputer notebookComputer = new NotebookComputer("联想");

        USB usb = new USB("USB3.0");
        notebookComputer.Equipment(usb);

        USBEquipment keyboard = new Keyboard("雷神");
        notebookComputer.Equipment(keyboard);
    }
}
