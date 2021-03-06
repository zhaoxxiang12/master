package abstractObject5;

public class Test {
    public static void main(String[] args) {
        // 准备电脑
        NotebookComputer notebookComputer = new NotebookComputer("联想",9999);

        // 准备键盘
        Keyboard keyboard = new Keyboard();

        //流程
        notebookComputer.TurnON();
        notebookComputer.work(keyboard);
        notebookComputer.TurnOff();
    }
}
