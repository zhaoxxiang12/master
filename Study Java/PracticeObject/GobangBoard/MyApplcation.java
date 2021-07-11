package GobangBoard;

import javafx.application.Application;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.scene.shape.Line;
import javafx.stage.Stage;

import java.awt.*;

public class MyApplcation extends Application {
    private int lineCount = 14;//棋盘中的水平线和垂直线的个数
    private int width = 560;//棋盘的宽度
    private int heigth = 560;//棋盘的高度
    private int padding = 40;//棋盘中的线与线之间的距离
    private int margin = 20;//棋盘中边线距离棋盘边的距离
    private Pane pane = null;//定义画板对象n
    private boolean isBlack = true; //true为黑色,false为白色
    private Chess[] chesses = new Chess[lineCount*lineCount]; //装棋子的容器
    private int count = 0;//索引，棋子的个数

    @Override
    public void start(Stage primaryStage) throws Exception {
        //获取画板对象
        Pane pane = getPane();
        //设置画板背景颜色
        pane.setBackground(new Background(new BackgroundFill(Color.GREEN, null, null)));
        //给画板对象，绑定鼠标点击事件，一点击就会执行某些动作
        pane.setOnMouseClicked(new EventHandler<MouseEvent>() {
            //鼠标点击滑板就会执行这个方法
            @Override
            public void handle(MouseEvent event) {
                //获取鼠标点击的那个位置x,y的坐标
                double x = event.getX();
                double y = event.getY();
                if (!(x >= 20 && x <= 540 && y >= 20 && y <= 540)) {
                    return;
                }
                //_x占x轴几个格子，_y占y轴几个格子,四舍五入
                int _x = ((int) x - margin + padding / 2) / padding;
                int _y = ((int) y - margin + padding / 2) / padding;
                //判断_x和_y坐标的位置是否有棋子,有的话就不继续执行
                if (isHaving(_x, _y)) {
                    return;
                }

                //创建圆圈对象 并设置一些参数
                Circle circle = null;
                //创建棋子对象
                Chess chess = null;
                if (isBlack) {
                    //黑色
                    circle = new Circle(_x * padding + margin, _y * padding + margin, 10, Color.BLACK);
                    isBlack = false;
                    chess = new Chess(_x,_y,Color.BLACK);
                } else {
                    //白色
                    circle = new Circle(_x * padding + margin, _y * padding + margin, 10, Color.WHITE);
                    isBlack = true;
                    chess = new Chess(_x,_y,Color.WHITE);
                }
                //将圆圈放在画板上
                pane.getChildren().add(circle);
                //向容器中存储一个棋子对象
                chesses[count] = chess;
                count++;
            }
        });
//        Line line = new Line(0,0,50,50);
//        pane.getChildren().add(line);

        //创建场景对象并且将画板对象放在场景中
        Scene scene = new Scene(pane, width, heigth);
        //将场景放在舞台上
        primaryStage.setScene(scene);
        //展示舞台
        primaryStage.show();
    }

    //判断是否有棋子
    private boolean isHaving(int _x, int _y) {
        //遍历容器
        for (int i =0;i<count;i++){
            Chess chess = chesses[i];
            if (chess.getX()==_x&&chess.getY()==_y){
                return true;
            }
        }
        return false;
    }

    //创建画板对象,将各个对象扔在画板中
    private Pane getPane() {
        //创建画板对象
        Pane pane = new Pane();
        //创建线条对象
        int increment = 0;
        for (int i = 0; i < lineCount; i++) {
            Line rowLine = new Line(margin, margin + increment, width - margin, margin + increment);
            Line colLine = new Line(margin + increment, margin, margin + increment, width - margin);
            //将线条放在画板中
            pane.getChildren().add(rowLine);
            pane.getChildren().add(colLine);
            increment += padding;
        }
        return pane;
    }

    //程序执行入口
    public static void main(String[] args) {
        launch(args);//固定写法,相当于启动开关,底层调用start方法且创建了Stage对象

    }
}
