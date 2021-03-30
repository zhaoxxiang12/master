package OperateExcel;

import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.util.ArrayList;
import java.util.Arrays;

public class ExcelUtil {
    public static void main(String[] args) {
        String []header = {"编号","姓名","性别","生日"};
        writeExcel(Store.list,"LOL",header);
    }
    public static void writeExcel(ArrayList<Students> list, String sheetName,String...header) {
        if (list == null || list.size() == 0 || header == null) {
            return;
        }
        //1.创建Excel对象
        XSSFWorkbook workbook = new XSSFWorkbook();
        //2.创建一个sheet名
        XSSFSheet sheet = workbook.createSheet(sheetName);
        //3.写表头
        XSSFRow title = sheet.createRow(0);
        System.out.println(list);
        System.out.println(sheetName);
        System.out.println(Arrays.toString(header));
    }
}
