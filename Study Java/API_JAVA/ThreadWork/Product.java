package ThreadWork;

public class Product {
    private long id;
    private String name;

    public Product() {
        super();
    }

    public Product(long id) {
        super();
        this.id = id;
    }

    @Override
    public String toString() {
        return id+"号产品";
    }
}
