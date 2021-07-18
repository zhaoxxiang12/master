package WebGoBang;

import GobangBoard.Chess;
import Message.ChessMessage;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.ButtonType;
import javafx.scene.control.Label;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.scene.shape.Line;
import javafx.stage.FileChooser;
import javafx.stage.Stage;
import javafx.stage.WindowEvent;

import java.io.*;
import java.net.Socket;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.Timer;
import java.util.TimerTask;
import java.util.function.Predicate;

public class SingleUI extends Stage {
    private int lineCount = 14;//棋盘中的水平线和垂直线的个数
    private int width = 560;//棋盘的宽度
    private int heigth = 600;//棋盘的高度
    private int padding = 40;//棋盘中的线与线之间的距离
    private int margin = 20;//棋盘中边线距离棋盘边的距离
    private Pane pane = null;//定义画板对象
    private boolean isBlack = true; //true为黑色,false为白色
    private Chess[] chesses = new Chess[lineCount * lineCount]; //装棋子的容器
    private int count = 0;//索引，棋子的个数
    private int isWinCount = 1;//连续棋子计数器
    private boolean isWin = false;//false未胜利,true胜利
    private Stage stage = null;

    public SingleUI() {
        //获取画板对象
        this.pane = getPane();
        this.stage = this;
        //落子
        moveChess();
        System.out.println(stage);
        //设置画板背景颜色
        pane.setBackground(new Background(new BackgroundFill(Color.GREEN, null, null)));
        //创建场景对象并且将画板对象放在场景中
        Scene scene = new Scene(pane, width, heigth);
        //将场景放在舞台上
        stage.setScene(scene);
        //给舞台对象绑定点击x事件
        stage.setOnCloseRequest(new EventHandler<WindowEvent>() {
            @Override
            public void handle(WindowEvent event) {
                //创建弹出框对象
                Alert alert = new Alert(Alert.AlertType.CONFIRMATION);
                alert.setTitle("退出");
                alert.setHeaderText("你确定退出吗");
                alert.setContentText("你真的退出吗");
                //展示
                Optional<ButtonType> optional = alert.showAndWait();
                if (optional.get() == ButtonType.OK) {
                    System.out.println("退出");
                } else {
                    System.out.println("不退出");
                    event.consume();
                }
            }
        });
        //展示舞台
        stage.show();
    }

    //落子功能
    public void moveChess() {
        //给画板对象，绑定鼠标点击事件，一点击就会执行某些动作
        pane.setOnMouseClicked(new EventHandler<MouseEvent>() {
            //鼠标点击滑板就会执行这个方法
            @Override
            public void handle(MouseEvent event) {
                //胜利了不再向下执行
                if (isWin) {
                    return;
                }
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
                    chess = new Chess(_x, _y, Color.BLACK);
                } else {
                    //白色
                    circle = new Circle(_x * padding + margin, _y * padding + margin, 10, Color.WHITE);
                    isBlack = true;
                    chess = new Chess(_x, _y, Color.WHITE);
                }
                //将圆圈放在画板上
                pane.getChildren().add(circle);
                //向容器中存储一个棋子对象
                chesses[count] = chess;
                count++;

                //网络编程:发送端
                Socket socket = null;
                try {
                    //创建Socket对象
                    socket = new Socket(Global.oip, Global.oPort);
                    //获取管道输出流对象
                    ObjectOutputStream oos = new ObjectOutputStream(socket.getOutputStream());
                    //向管道里写对象
                    oos.writeObject(new ChessMessage(_x, _y, !isBlack));
                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    try {
                        if (socket != null) {
                            socket.close();
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }

                if (isWin(chess)) {
                    System.out.println("Win");
                    //弹框
                    Alert alert = new Alert(Alert.AlertType.INFORMATION);
                    //设置文字说明
                    alert.setTitle("标题");
                    alert.setHeaderText("胜利");
                    alert.setContentText("Haha");
                    //展示
                    alert.showAndWait();
                    isWin = true;
                }
            }
        });
    }

    //判断是否胜利
    private boolean isWin(Chess chess) {
        /**
         * 当落完子之后，连续相同颜色的棋子个数等于5就说明胜利了
         */
        int x = chess.getX();
        int y = chess.getY();
        //水平方向判断(向右)
        for (int i = x + 1; i <= x + 4 && i <= 13; i++) {//右边坐标
            //判断这个(i,y)坐标是否有棋子,颜色是什么
            Chess _chess = getChess(i, y);
            if (_chess != null && chess.getColor().equals(_chess.getColor())) {
                //颜色一样就自加
                isWinCount++;
            } else {
                break;
            }
        }

        //水平方向判断(向左)
        for (int i = x - 1; i >= x - 4 && i >= 0; i--) {//左边坐标
            //判断这个(i,y)坐标是否有棋子,颜色是什么
            Chess _chess = getChess(i, y);
            if (_chess != null && chess.getColor().equals(_chess.getColor())) {
                //颜色一样就自加
                isWinCount++;
            } else {
                break;
            }
        }
        //判断计数器的个数是否大于等于5
        if (isWinCount >= 5) {
            isWinCount = 1;
            return true;
        }
        //判断垂直方向,斜着方向
        isWinCount = 1;
        return false;
    }

    //获取指定坐标处的棋子对象
    private Chess getChess(int x, int y) {
        for (int i = 0; i < count; i++) {
            Chess chess = chesses[i];
            if (chess.getX() == x && chess.getY() == y) {
                return chess;
            }
        }
        return null;
    }

    //判断是否有棋子
    private boolean isHaving(int _x, int _y) {
        //遍历容器
        for (int i = 0; i < count; i++) {
            Chess chess = chesses[i];
            if (chess.getX() == _x && chess.getY() == _y) {
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
        //获取再来一局按键对象
        Button startButton = getStartButton();
        pane.getChildren().add(startButton);
        //获取悔棋按键对象
        Button backButton = getBackButton();
        pane.getChildren().add(backButton);
        //获取保存棋谱按键对象
        Button saveButton = getSaveButton();
        pane.getChildren().add(saveButton);
        //创建标签文本对象
        Label label = new Label();
        //设置文本内容
        label.setText("时间");
        //设置坐标
        label.setLayoutX(220);
        label.setLayoutY(0);
        pane.getChildren().add(label);
        //设置定时器对象
        Timer timer = new Timer();
        //设置计时功能
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                //获取当前日期时间
                LocalDateTime localDateTime = LocalDateTime.now();
                //时间格式化
                DateTimeFormatter pattern = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                String time = localDateTime.format(pattern);
                Platform.runLater(new Runnable() {
                    @Override
                    public void run() {
                        //将时间设置到文本标签中
                        label.setText(time);
                    }
                });
            }
        }, 0, 1000);
        return pane;
    }

    /**
     * 再来一局
     *
     * @return
     */
    private Button getStartButton() {
        Button startButton = new Button("再来一局");
        startButton.setPrefSize(80, 30);
        //设置坐标
        startButton.setLayoutX(20);
        startButton.setLayoutY(550);
        //给按键增加事件对象
        startButton.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent event) {
                //再来一局代码实现
                if (!isWin) {
                    return;
                }
                //清空画板上的Circle对象
                pane.getChildren().removeIf(new Predicate<Node>() {
                    @Override
                    public boolean test(Node node) {
                        return node instanceof Circle;
                    }
                });
                //清空容器
                chesses = new Chess[lineCount * lineCount];
                //计数器归零
                count = 0;
                //胜负归为false
                isWin = false;
                //将黑白颜色标记归为黑色
                isBlack = true;
            }
        });
        return startButton;
    }

    /**
     * 悔棋
     *
     * @return
     */
    private Button getBackButton() {
        Button backButton = new Button("悔棋");
        backButton.setPrefSize(80, 30);
        //设置坐标
        backButton.setLayoutX(120);
        backButton.setLayoutY(550);
        backButton.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent event) {
                System.out.println("1111");
            }
        });
        return backButton;
    }

    /**
     * 保存棋谱
     *
     * @return
     */
    private Button getSaveButton() {
        Button saveButton = new Button("保存棋谱");
        saveButton.setPrefSize(80, 30);
        //设置坐标
        saveButton.setLayoutX(210);
        saveButton.setLayoutY(550);
        saveButton.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent event) {
                if (!isWin) {
                    return;
                }
                //创建保存对象
                FileChooser fileChooser = new FileChooser();
                File file = fileChooser.showSaveDialog(stage);
                if (file != null) {
                    //创建高效字符输出流（父类没有抛异常子类也不能抛异常）
                    BufferedWriter bw = null;
                    try {
                        bw = new BufferedWriter(new FileWriter(file));
                        //一次写一个字符串
                        for (int i = 0; i < count; i++) {
                            Chess chess = chesses[i];
                            bw.write(chess.getX() + "," + chess.getY() + "," + chess.getColor());
                            bw.newLine();
                            bw.flush();
                        }
                    } catch (Exception e) {
                        System.out.println("保存失败");
                    } finally {
                        if (bw != null) {
                            try {
                                bw.close();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                    }
                }
            }
        });
        return saveButton;
    }

}
