package XMLAndProperties;

public class XMLAndProperties {
    public static void main(String[] args) {
        //XML Properties区别

        // Properties主要用于单项配置
        // jdbc.properties: driver = jdbc.mysql.Driver url = msyql://localhost:3306/db  username = password =


        //XML主要用于多项配置
        // jdbc.xml  <databases> <database id = "mysql">

        //第一行要写文档声明
        //   <?xml version = "1.0" encoding = "utf-8"?>
// xml 文件中有且只能有一个根标签
//xml文件中的标签属性要由单引号或者双引号括起来
        //xml标签嵌套
//        <aaa>
//        <bbb></bbb>
//    </aaa>
//xml严格区分大小写
        //xml文件的标签名命名规则：
            // 1.数字，字母和一些字符组成
            // 2.首字母不能是数字和标点符号
            // 3.标签名中不能有空格
        //CDATA区域
           //格式：<![CDATA[
//            内容
//                    ]]>

    }
}
