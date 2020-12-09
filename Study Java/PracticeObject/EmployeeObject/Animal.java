package EmployeeObject;

public class Animal {
    String CatName; // 成员变量  默认为null
    String DogName;
    public void eat(Food food){
        System.out.println(CatName+"喜欢吃"+ food.CatFood);
        System.out.println(DogName+"喜欢吃"+ food.DogFood);
    }
    public void eat(Meat meat){ // 方法重载
        System.out.println(CatName+"喜欢吃"+meat.name);
    }
}
