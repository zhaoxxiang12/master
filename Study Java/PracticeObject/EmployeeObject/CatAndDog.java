package EmployeeObject;

public class CatAndDog {


    public static void main(String[] args) {
        Animal animal = new Animal();
        Food food = new Food();
        Meat meat = new Meat();
        food.CatFood = "罗非鱼";
        food.DogFood = "里脊肉"; // 赋值给food对象
        animal.CatName = " 加菲猫"; //赋值给对象Cat
        animal.DogName = " 哈士奇";
        meat.name = "牛肉";
        animal.eat(food);
        animal.eat(meat);
//        System.out.println(animal); // 方法地址


    }
}
