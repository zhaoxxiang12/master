package GeneralArray;

public class TestModel {
    public static void main(String[] args) {
        // 泛型类-方法接收类型
        Model<String> model = new Model<String>();
        model.test("123");

        Model<Integer> model2 = new Model<Integer>();
        model2.test(123);

        //泛型-方法返回类型
        System.out.println(model.returnObj());
    }
}
