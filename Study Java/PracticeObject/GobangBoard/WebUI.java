package GobangBoard;

import Message.ChessMessage;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;

import java.io.ObjectInputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class WebUI extends Stage {
    public WebUI() {
        //获取画板对象
        Pane pane = new Pane();
        //创建标签对象
        Label mipLabel = new Label("我的IP：");
        //设置IP位置
        mipLabel.setLayoutX(50);
        mipLabel.setLayoutY(30);

        Label myPort = new Label("我的端口：");
        //设置端口位置
        myPort.setLayoutX(50);
        myPort.setLayoutY(60);

        Label oipLabel = new Label("对方IP：");
        //设置其他IP位置
        oipLabel.setLayoutX(50);
        oipLabel.setLayoutY(110);

        Label oPort = new Label("对方端口：");
        //设置其他端口位置
        oPort.setLayoutX(50);
        oPort.setLayoutY(150);
        //将标签对象添加到画板上
        pane.getChildren().addAll(mipLabel, myPort, oipLabel, oPort);
        //创建文本框对象
        TextField mipText = new TextField();
        //设置位置
        mipText.setLayoutX(110);
        mipText.setLayoutY(25);
        TextField miPortText = new TextField();
        //设置位置
        miPortText.setLayoutX(110);
        miPortText.setLayoutY(55);

        //创建文本框对象
        TextField oipText = new TextField();
        //设置位置
        oipText.setLayoutX(110);
        oipText.setLayoutY(105);
        TextField oiPortText = new TextField();
        //设置位置
        oiPortText.setLayoutX(110);
        oiPortText.setLayoutY(145);

        //将文本框添加到画板上
        pane.getChildren().addAll(mipText, miPortText, oipText, oiPortText);
        //创建确定按键对象
        Button startButton = new Button("确定");
        startButton.setPrefSize(50, 30);
        startButton.setLayoutX(50);
        startButton.setLayoutY(200);
        //确定按键增加绑定事件
        startButton.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent event) {
                //获取文本框的数据
                String mip = mipText.getText();
                int mPort = Integer.parseInt(miPortText.getText());
                String oip = oipText.getText();
                int oPort = Integer.parseInt(oiPortText.getText());

                Global.mip = mip;
                Global.mPort = mPort;
                Global.oip = oip;
                Global.oPort = oPort;

                //创建网络版游戏界面
                NetUI webUI = new NetUI();
                //展示
                webUI.show();
                //关闭配置信息窗口
                WebUI.this.close();
                //编写网络编程:接收端
                new Thread() {
                    @Override
                    public void run() {
                        try {
                            //创建Socket对象
                            ServerSocket serverSocket = new ServerSocket(Global.mPort);
                            while (true) {
                                //监听连接
                                Socket socket = serverSocket.accept();
                                //获取管道输入流对象
                                ObjectInputStream ois = new ObjectInputStream(socket.getInputStream());
                                //读取管道对象
                                Object obj = ois.readObject();
                                if (obj instanceof ChessMessage) {
                                    ChessMessage chessMessage = (ChessMessage) obj;
                                    //在自己管道添加一颗新的棋子
                                   webUI.upDateUI(chessMessage);
                                }
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }.start();

            }
        });
        Button cancelButton = getCancelButton();
        pane.getChildren().addAll(startButton, cancelButton);
        //创建场景对象
        Scene scene = new Scene(pane, 500, 300);
        //将场景放在舞台上
        this.setScene(scene);
    }

    public Button getCancelButton() {
        //创建取消按键对象
        Button cancelButton = new Button("取消");
        cancelButton.setPrefSize(50, 30);
        cancelButton.setLayoutX(218);
        cancelButton.setLayoutY(200);
        //取消按键增加绑定事件
        cancelButton.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent event) {
                //关闭配置窗口
                WebUI.this.close();
            }
        });
        return cancelButton;
    }
}


