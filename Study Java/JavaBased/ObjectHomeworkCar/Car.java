package ObjectHomeworkCar;

public class Car {
    private  String brand;
    public void setBrand(String brand){
        this.brand = brand;
    }

    public String getBrand() {
        return brand;
    }
    public void drive(){
        System.out.println("汽车可以加速");
    }
}
