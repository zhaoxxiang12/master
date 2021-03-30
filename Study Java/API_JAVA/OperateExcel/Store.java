package OperateExcel;

import java.util.ArrayList;
import java.util.Date;

public class Store {
    public static ArrayList<Students> list = new ArrayList<Students>();

    static {
        list.add(new Students(1L,"艾希","女",new Date()));
        list.add(new Students(2L,"凯特琳","女",new Date()));
        list.add(new Students(3L,"光辉","女",new Date()));
        list.add(new Students(4L,"易大师","男",new Date()));
        list.add(new Students(5L,"艾克","男",new Date()));
        list.add(new Students(6L,"薇恩","女",new Date()));
        list.add(new Students(7L,"嘉文","男",new Date()));
        list.add(new Students(8L,"艾瑞利亚","女",new Date()));
        list.add(new Students(9L,"阿狸","女",new Date()));
        list.add(new Students(10L,"卡特","女",new Date()));
        list.add(new Students(11L,"赵信","女",new Date()));
    }
}
