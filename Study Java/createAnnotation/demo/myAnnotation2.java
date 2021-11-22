package demo;

import myAnnotation.myAnnotation;
import myAnnotation.myEnum;

//属性定义
public @interface myAnnotation2 {
    //数据类型 属性名()  数据类型可以为以下几种 基本数据类型:String 枚举
    String aaa();
    int BB();
    myEnum myEnum();
    myAnnotation ddd();

    String [] eee();
}
