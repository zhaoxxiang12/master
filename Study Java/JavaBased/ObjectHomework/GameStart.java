package ObjectHomework;

public class GameStart {
    public static void main(String[] args) {
        SmallGames smallGames = new SmallGames();
        int ComputerAction = smallGames.computer();
        int PlayAction = smallGames.player();
        if (ComputerAction == 1 && PlayAction == 1 || ComputerAction == 2 && PlayAction == 2 || ComputerAction == 3 && PlayAction == 3) {
            System.out.println("平局");
        } else if (ComputerAction == 1 && PlayAction == 2 || ComputerAction == 2 && PlayAction == 3 || ComputerAction == 3 && PlayAction == 1) {
            System.out.println("电脑Win");
        } else if (ComputerAction == 1 && PlayAction == 3 || ComputerAction == 2 && PlayAction == 1 || ComputerAction == 3 && PlayAction == 2) {
            System.out.println("你Win");
        } else {
            System.out.println("程序出错");
        }
    }
}
