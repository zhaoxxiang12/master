package NameOfInterface;

/**
 *
 * 接口多继承
 * 一个接口能继承另一个接口，和类之间的继承方式比较相似。接口的继承使用extends关键字，子接口继承父接口的方法。
 * 下面的Sports接口被Hockey和Football接口继承
 */
public interface Sports{
    public void setHomeTeam(String name);
    public void setVisitingTeam(String name);
}