package OperateExcel;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class ExcelWrite {
    public static void main(String[] args)throws FileNotFoundException, IOException {
        //1.创建一个Excel的工作簿
        XSSFWorkbook workbook = new XSSFWorkbook();
        //2.创建一个sheet
        XSSFSheet sheet = workbook.createSheet("测试");
        //3.创建行
        XSSFRow row =sheet.createRow(0);//第一行
        //4.从指定行中找单元格(行与列相交的格子)
        XSSFCell cell1 = row.createCell(0);//第一行第一个单元格
        cell1.setCellValue("姓名");

        XSSFCell cell2 = row.createCell(1);//第一行第二个单元格
        cell2.setCellValue("性别");
        XSSFCell cell3 = row.createCell(2);//第一行第三个单元格
        cell3.setCellValue("薪资");

        //5.创建文件输出流
        FileOutputStream fos = new FileOutputStream("API_JAVA/OperateExcel/用户名.xlsx");
        workbook.write(fos);
        //6.释放资源
        fos.close();
        workbook.close();

    }
}
