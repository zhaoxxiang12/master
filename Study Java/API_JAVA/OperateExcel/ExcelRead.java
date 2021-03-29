package OperateExcel;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.IOException;

public class ExcelRead {
    public static void main(String[] args) throws IOException {
        FileInputStream fis = new FileInputStream("API_JAVA/OperateExcel/用户名.xlsx");
        XSSFWorkbook workbook = new XSSFWorkbook(fis);
        XSSFSheet sheet = workbook.getSheet("测试");//读取sheet名
        XSSFRow row = sheet.getRow(0);//读取列
        XSSFCell cell = row.getCell(0);//读取行
        String value = cell.getStringCellValue();
        System.out.println(value);
    }
}
