package StringPackage;

public class StringDemo5 {
    public static void main(String[] args) {
         // 1. 字符串的截取
        String s1 = "shanghai2019";
//        System.out.println(s1.substring(8)); //结果2019 从下标8开始截取到结尾
//        System.out.println(s1.substring(0,8));//结果shanghai 从下标0开始，到下标7结束范围[0,8)

        //获取文件的文件名
        String fileName = "在线教育平台需求调整(2).docx";
        int index = fileName.lastIndexOf(".");
        String s = fileName.substring(0,index);
        String suffix = fileName.substring(index);
//        System.out.println(s);
//        System.out.println(suffix);


        String [] fileLists = {"在线教育平台需求调整(2).docx","DTU疑问.txt","EQA.txt","data-report-tool.jar","Fiddler.exe"};
//        for(String file:fileLists){//加强for循环
//
//        }
        for (int i = 0;i<fileLists.length;i++){
            int indexMark = fileLists[i].lastIndexOf(".");
            String listFileName = fileLists[i].substring(0,indexMark); // 文件名
            String suffixName =fileLists[i].substring(indexMark); // 扩展名/后缀名
            System.out.println(listFileName);
            System.out.println(suffixName);
        }
    }
}
