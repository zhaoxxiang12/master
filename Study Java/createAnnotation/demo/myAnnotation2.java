package demo;

import myAnnotation.myAnnotation;
import myAnnotation.myEnum;

//属性定义
public @interface myAnnotation2 {
    //1.数据类型 属性名()  数据类型可以为以下几种 基本数据类型:String 枚举
    //2.可以给注解中的属性设置默认值，一旦设置默认值default，就不需要给该属性赋值，当然也可以赋值
    //3.注解中有一个特殊的属性名，叫做value，一旦属性名字叫做value，在使用注解给该属性赋值的时候，就不需要写属性名，前提是有且只有一个注解
    String aaa() default "aaa"; //设置默认值
    int BB();
    myEnum myEnum();
    myAnnotation ddd();
    String value();
    String [] eee();
}
