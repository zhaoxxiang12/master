package GobangBoard;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;

public class NetGoBang extends Application {

    @Override
    public void start(Stage stage) throws Exception {
        //创建画板对象
        Pane pane = new Pane();
        Scene scene = new Scene(pane, 500, 300);
        //获取单机版按键
        getSingleButton(pane, stage);
        //获取网络版按键对象
        getWebButton(stage, pane);
        //将场景放在舞台上
        stage.setScene(scene);
        //展示舞台
        stage.show();
    }

    public void getWebButton(Stage stage, Pane pane) {
        //创建网络版按键对象
        Button webButton = new Button("网络版");
        webButton.setPrefSize(100, 100);
        //设置坐标
        webButton.setLayoutX(350);
        webButton.setLayoutY(50);
        //创建场景对象
        pane.getChildren().add(webButton);
        //绑定事件
        webButton.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent event) {
                WebUI webUI = new WebUI();
                //展示棋盘
                webUI.show();
                //关闭主界面
                stage.close();
            }
        });
    }

    public void getSingleButton(Pane pane, Stage stage) {
        //创建单机版按键对象
        Button singleButton = new Button("单机版");
        singleButton.setPrefSize(100, 100);
        //设置坐标
        singleButton.setLayoutX(50);
        singleButton.setLayoutY(50);
        //创建场景对象
        pane.getChildren().add(singleButton);
        //绑定事件
        singleButton.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent event) {
                NetUI netUI = new NetUI();
                //展示
                netUI.show();
                //关闭主界面
                stage.close();
            }
        });
    }
    public static void main(String[] args) {
        launch(args);
    }
}
