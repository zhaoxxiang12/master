package ObjectHomeworkCar;

public class Benz extends Car {
    private  double price;
    private String type;
    public void setPrice(double price){
        this.price = price;
    }

    public double getPrice() {
        return price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    @Override
    public void drive(){
        System.out.println("奔驰在行驶");
    }
}