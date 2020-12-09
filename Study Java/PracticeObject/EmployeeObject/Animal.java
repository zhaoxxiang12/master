package EmployeeObject;

public class Animal {
    String CatName;
    String DogName;
    public void eat(){
        Food food = new Food();
        System.out.println(CatName+"喜欢吃"+ food.CatFood);
        System.out.println(DogName+"喜欢吃"+ food.DogFood);
    }
}
