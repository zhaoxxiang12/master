package GeneralArray;

public class TestSuperArray {
    public static void main(String[] args) {
      SuperArray<String>list =  new  SuperArray<String>();
      list.add("123");
      System.out.println(list.getArray(0));

        SuperArray<Integer>list2 =  new  SuperArray<Integer>();
        list2.add(123);
        list2.getArray(0);
    }
}
