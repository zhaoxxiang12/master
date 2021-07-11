package Gobang;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.Pane;
import javafx.scene.shape.Line;
import javafx.stage.Stage;

public class MyApplcation extends Application {
    private int lineCout = 14;//棋盘中的水平线和垂直线的个数
    private int width = 560;
    private int heigth = 560;
    private int padding =40;
    private int margin = 20;
    @Override
    public void start(Stage primaryStage) throws Exception {
        //创建画板对象
        Pane pane = new Pane();
        //创建线条对象
        int increment = 0;
        for (int i = 0;i<lineCout;i++){
            Line rowLine = new Line(margin,margin + increment,width-margin,margin+increment);
            Line colLine = new Line(margin + increment,margin,margin+increment,width - margin);
            //将线条放在花瓣中
            pane.getChildren().add(rowLine);
            pane.getChildren().add(colLine);
            increment+=padding;
        }
//        Line line = new Line(0,0,50,50);
//        pane.getChildren().add(line);

        //创建场景对象并且将画板对象放在场景中
        Scene scene = new Scene(pane,width,heigth);
        //将场景放在舞台上
        primaryStage.setScene(scene);
        //展示舞台
        primaryStage.show();
    }
    //程序执行入口
    public static void main(String[] args) {
        launch(args);//固定写法,相当于启动开关,底层调用start方法且创建了Stage对象

    }
}
