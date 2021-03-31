package OperateExcel;

import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;

public class ExcelUtil {
    public static void main(String[] args) throws IOException, ParseException {
        String[] header = {"编号", "姓名", "性别", "生日", "专业"};
//        writeExcel(Store.list, "LOL", header);
        ArrayList<Students>readExcel = readExcel("API_JAVA/OperateExcel/LOL总表.xlsx","LOL");
//        System.out.println(readExcel);
//      for (Students students:readExcel) {
//          System.out.println(students);
//      }
    }

    /**
     * 1.将源数据写入Excel
     *
     * @param list
     * @param sheetName 标签名
     * @param header    表头
     * @throws IOException
     */
    public static void writeExcel(ArrayList<Students> list, String sheetName, String... header) throws IOException {
        if (list == null || list.size() == 0 || header == null) {
            return;
        }
        //1.创建Excel对象
        XSSFWorkbook workbook = new XSSFWorkbook();
        //2.创建一个sheet名
        XSSFSheet sheet = workbook.createSheet(sheetName);
        //3.写表头
        XSSFRow headRow = sheet.createRow(0);
        for (int i = 0; i < header.length; i++) {
            XSSFCell cell = headRow.createCell(i);
            cell.setCellValue(header[i]);
        }
        //4.需要向Excel中填充内容
        for (int i = 1; i <= list.size(); i++) {// i：Excel中rowIndex
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            XSSFRow row = sheet.createRow(i);
            XSSFCell cell0 = row.createCell(0);//学生编号
            cell0.setCellValue(list.get(i - 1).getStudentID());

            XSSFCell cell1 = row.createCell(1);//学生姓名
            cell1.setCellValue(list.get(i - 1).getName());

            XSSFCell cell2 = row.createCell(2);//学生性别
            cell2.setCellValue(list.get(i - 1).getSex());

            XSSFCell cell3 = row.createCell(3);//学生生日
            cell3.setCellValue(sdf.format(list.get(i - 1).getBirth()));

            XSSFCell cell4 = row.createCell(4);//学生专业
            cell4.setCellValue(list.get(i - 1).getMajor());
        }
        FileOutputStream fos = new FileOutputStream("API_JAVA/OperateExcel/" + sheetName + "总表.xlsx");
        workbook.write(fos);
        System.out.println("数据已成功写入Excel");
        fos.close();
        workbook.close();

    }

    public static ArrayList<Students>  readExcel(String filePath, String sheetName) throws IOException, ParseException {
        if (filePath == null || !filePath.endsWith(".xlsx") || sheetName == null || sheetName.equals("")) {
            System.out.println("文件路径不存在");
            return null;
        }
        File file = new File(filePath);
        if (!file.exists()) {
            System.out.println("访问的Excel不存在");
            return null;
        }
        FileInputStream fis = new FileInputStream(file);
        //1.读取Excel
        XSSFWorkbook workbook = new XSSFWorkbook(fis);
        //2.读取哪个sheet
        XSSFSheet sheet =workbook.getSheet(sheetName);
        //3.读取Excel中的数据到集合中
//        System.out.println(sheet.getLastRowNum());
        ArrayList<Students>list = new ArrayList<Students>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        for (int i = 1;i<=sheet.getLastRowNum();i++){//sheet.getLastRowNum()最后一行的索引
          XSSFRow row = sheet.getRow(i); //获取每一行
            Students students = new Students();
            XSSFCell cell = row.getCell(0);
            cell.setCellType(CellType.STRING);
            String cellValue = cell.getStringCellValue();
            System.out.println(cellValue.get);
//            long value = Long.parseLong(cellValue);
//            XSSFCell cell = row.getCell(0);
//            cell.setCellType(CellType.NUMERIC);
//            long value = (long) cell.getNumericCellValue();

//            long id =Long.parseLong (cell.getStringCellValue().substring(0,(cell.getStringCellValue().indexOf("."))));
//            students.setStudentID(value);
            students.setName(row.getCell(1).getStringCellValue());

            students.setSex(row.getCell(2).getStringCellValue());

            String date = row.getCell(3).getStringCellValue();
            students.setBirth(sdf.parse(date));

            students.setMajor(row.getCell(4).getStringCellValue());
            list.add(students);
        }
        fis.close();
        workbook.close();
        return list;

    }

}
