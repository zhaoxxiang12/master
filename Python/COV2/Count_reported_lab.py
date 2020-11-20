import pymysql, unittest,allure


class Optimization(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        dataBase = 'cov_report_test'
        host = '8.129.173.137'
        userName = 'cov_report_test'
        passWord = 'test_udRQIHuW7v'
        cls.inputProvinceName = input('输入省份,如河北')
        cls.realProvinceName = cls.inputProvinceName + '%'
        cls.inputDate = input('输入日期，如格式为2020-09-02')
        cls.realDate = cls.inputDate + '%'
        cls.con = pymysql.connect(host=host, port=3306, user=userName, password=passWord, database=dataBase)
        cls.cursor = cls.con.cursor()

    '''  统计检测机构数 '''

    # 统计上报的机构职能为检测机构（合计）
    def test01(self):
        sql = "select COUNT(*) from report_lab_info_ext where lab_id in " \
              "(SELECT lab_id FROM report_workload_record WHERE province_code IN" \
              "(SELECT province_code FROM common_province WHERE province_name LIKE '%s')and test_time like '%s' and flow_status=2)" \
              "and (inst_function = 'inst_function_0002' OR inst_function = 'inst_function_0003' ) " % (
                  self.realProvinceName, self.realDate)
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        self.con.commit()
        result = result[0][0]
        strResult = str(result)
        print(self.inputProvinceName+'上报的检测机构合计为：' + strResult)

    #     统计检测机构为医疗总数
    def test02(self):
        sql = "SELECT COUNT(*) FROM report_lab_info_ext WHERE lab_id IN " \
              "( SELECT lab_id FROM report_workload_record WHERE province_code IN " \
              "( SELECT province_code FROM common_province WHERE province_name LIKE '%s' ) AND test_time LIKE '%s' and flow_status = 2 ) " \
              "AND (inst_function = 'inst_function_0002' OR inst_function = 'inst_function_0003' )  " \
              "and inst_category = 'inst_category_0001'" \
              % (self.realProvinceName, self.realDate)
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        self.con.commit()
        result = result[0][0]
        strResult = str(result)
        print(self.inputProvinceName+'上报的医疗检测机构合计为：' + strResult)

    #     统计检测机构为医疗（三级）
    def test03(self):
        sql = "SELECT COUNT(*) FROM report_lab_info_ext  WHERE lab_id IN " \
              "( SELECT lab_id FROM report_workload_record WHERE province_code IN " \
              "( SELECT province_code FROM common_province WHERE province_name LIKE '%s' ) AND test_time LIKE '%s' and flow_status = 2 )" \
              "AND (inst_function = 'inst_function_0002' OR inst_function = 'inst_function_0003')  and inst_category = 'inst_category_0001'" \
              "and (inst_class = 'inst_class_0004' or inst_class = 'inst_class_0003' or inst_class = 'inst_class_0002')" % (
                  self.realProvinceName, self.realDate)
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        self.con.commit()
        result = result[0][0]
        strResult = str(result)
        print(self.inputProvinceName+'上报的三级医疗检测机构合计为：' + strResult)

    #     统计检测机构为医疗（二级）
    def test04(self):
        sql = "SELECT COUNT(*) FROM report_lab_info_ext  WHERE lab_id IN " \
              "( SELECT lab_id FROM report_workload_record WHERE province_code IN " \
              "( SELECT province_code FROM common_province WHERE province_name LIKE '%s' ) AND test_time LIKE '%s' and flow_status = 2 )" \
              "AND (inst_function = 'inst_function_0002' OR inst_function = 'inst_function_0003')  and inst_category = 'inst_category_0001'" \
              "and (inst_class = 'inst_class_0007' or inst_class = 'inst_class_0006' or inst_class = 'inst_class_0005')" % (
                  self.realProvinceName, self.realDate)
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        self.con.commit()
        result = result[0][0]
        strResult = str(result)
        print(self.inputProvinceName+'上报的二级医疗检测机构合计为：' + strResult)

    #     统计检测机构为医疗（其他或未定级）
    def test05(self):
        sql = "SELECT COUNT(*) FROM report_lab_info_ext  WHERE lab_id IN " \
              "( SELECT lab_id FROM report_workload_record WHERE province_code IN " \
              "( SELECT province_code FROM common_province WHERE province_name LIKE '%s' ) AND test_time LIKE '%s' and flow_status = 2 )" \
              "AND (inst_function = 'inst_function_0002' OR inst_function = 'inst_function_0003')  and inst_category = 'inst_category_0001'" \
              "and inst_class = 'inst_class_0008' " % (
                  self.realProvinceName, self.realDate)
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        self.con.commit()
        result = result[0][0]
        strResult = str(result)
        print(self.inputProvinceName+'上报的其他未定级医疗检测机构合计为：' + strResult)

    #     统计检测机构为疾控（总数）
    def test06(self):
        sql = "SELECT COUNT(*) FROM report_lab_info_ext WHERE lab_id IN " \
              "( SELECT lab_id FROM report_workload_record WHERE province_code IN " \
              "( SELECT province_code FROM common_province WHERE province_name LIKE '%s' ) " \
              "AND test_time LIKE '%s' and flow_status = 2 ) AND (inst_function = 'inst_function_0002' OR inst_function = 'inst_function_0003' )  " \
              "and inst_category = 'inst_category_0002'" % (
                  self.realProvinceName, self.realDate)
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        self.con.commit()
        result = result[0][0]
        strResult = str(result)
        print(self.inputProvinceName+'上报的疾控检测机构合计为：' + strResult)

    #     省级疾控数量
    def test07(self):
        sql = "SELECT COUNT(*) FROM report_lab_info_ext WHERE lab_id IN " \
              "( SELECT lab_id FROM report_workload_record WHERE province_code IN " \
              "( SELECT province_code FROM common_province WHERE province_name LIKE '%s' ) AND test_time LIKE '%s' and flow_status = 2 )" \
              "AND (inst_function = 'inst_function_0002' OR inst_function = 'inst_function_0003' )  " \
              "and inst_category = 'inst_category_0002'and inst_class = 'inst_class_0011'" % (
                  self.realProvinceName, self.realDate)
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        self.con.commit()
        result = result[0][0]
        strResult = str(result)
        print(self.inputProvinceName+'上报的省级疾控检测机构合计为：' + strResult)

    #     市级疾控数量
    def test08(self):
        sql = "SELECT COUNT(*) FROM report_lab_info_ext WHERE lab_id IN " \
              "( SELECT lab_id FROM report_workload_record WHERE province_code IN " \
              "( SELECT province_code FROM common_province WHERE province_name LIKE '%s' ) " \
              "AND test_time LIKE '%s' and flow_status = 2 ) AND (inst_function = 'inst_function_0002' OR inst_function = 'inst_function_0003' )  " \
              "and inst_category = 'inst_category_0002'and inst_class = 'inst_class_0010'" % (
                  self.realProvinceName, self.realDate)
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        self.con.commit()
        result = result[0][0]
        strResult = str(result)
        print(self.inputProvinceName+'上报的市级级疾控检测机构合计为：' + strResult)

    #     县级疾控数量
    def test09(self):
        sql = "SELECT COUNT(*) FROM report_lab_info_ext WHERE lab_id IN " \
              "( SELECT lab_id FROM report_workload_record WHERE province_code IN " \
              "( SELECT province_code FROM common_province WHERE province_name LIKE '%s' ) AND test_time LIKE '%s' and flow_status = 2 ) " \
              "AND (inst_function = 'inst_function_0002' OR inst_function = 'inst_function_0003' )  " \
              "and inst_category = 'inst_category_0002'and inst_class = 'inst_class_0009'" % (
                  self.realProvinceName, self.realDate)
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        self.con.commit()
        result = result[0][0]
        strResult = str(result)
        print(self.inputProvinceName+'上报的县级疾控检测机构合计为：' + strResult)

    #     第三方实验室
    def test10(self):
        sql = "SELECT COUNT(*) FROM report_lab_info_ext WHERE lab_id IN " \
              "( SELECT lab_id FROM report_workload_record WHERE province_code IN " \
              "( SELECT province_code FROM common_province WHERE province_name LIKE '%s' ) " \
              "AND test_time LIKE '%s' and flow_status = 2 ) " \
              "AND (inst_function = 'inst_function_0002' OR inst_function = 'inst_function_0003' )  and inst_category = 'inst_category_0003'" % (
                  self.realProvinceName, self.realDate)
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        self.con.commit()
        result = result[0][0]
        strResult = str(result)
        print(self.inputProvinceName+'上报的第三方实验室控检测机构合计为：' + strResult)

    '''上报机构数不区分检测机构'''

    def test011(self):
        sql = "SELECT COUNT(*) FROM report_lab_info_ext WHERE lab_id IN " \
              "( SELECT lab_id FROM report_workload_record WHERE province_code IN " \
              "( SELECT province_code FROM common_province WHERE province_name LIKE '%s' ) " \
              "AND test_time LIKE '%s' and flow_status = 2 ) " % (
                  self.realProvinceName, self.realDate)
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        self.con.commit()
        result = result[0][0]
        strResult = str(result)
        print(self.inputProvinceName+'上报的上报机构总数(不区分检测机构)为：' + strResult)

    # 上报机构属性为医疗
    def test012(self):
        sql = "SELECT COUNT(*) FROM report_lab_info_ext WHERE lab_id IN " \
              "( SELECT lab_id FROM report_workload_record WHERE province_code IN " \
              "( SELECT province_code FROM common_province WHERE province_name LIKE '%s' ) AND test_time LIKE '%s' and flow_status = 2 )" \
              "and inst_category = 'inst_category_0001'" % (
                  self.realProvinceName, self.realDate)
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        self.con.commit()
        result = result[0][0]
        strResult = str(result)
        print(self.inputProvinceName+'上报的上报医疗机构(不区分检测机构)合计为：' + strResult)

    # 上报机构属性为疾控
    def test013(self):
        sql = "SELECT COUNT(*) FROM report_lab_info_ext WHERE lab_id IN " \
              "( SELECT lab_id FROM report_workload_record WHERE province_code IN " \
              "( SELECT province_code FROM common_province WHERE province_name LIKE '%s' ) AND test_time LIKE '%s' AND flow_status = 2 )" \
              "AND inst_category = 'inst_category_0002'" % (
                  self.realProvinceName, self.realDate)
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        self.con.commit()
        result = result[0][0]
        strResult = str(result)
        print(self.inputProvinceName+'上报的上报疾控机构(不区分检测机构)合计为：' + strResult)

    # 上报机构数为第三方实验室
    def test014(self):
        sql = "SELECT COUNT(*) FROM report_lab_info_ext WHERE lab_id IN " \
              "( SELECT lab_id FROM report_workload_record WHERE province_code IN " \
              "( SELECT province_code FROM common_province WHERE province_name LIKE '%s' ) " \
              "AND test_time LIKE '%s' and flow_status = 2 ) And inst_category = 'inst_category_0003'" % (
                  self.realProvinceName, self.realDate)
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        self.con.commit()
        result = result[0][0]
        strResult = str(result)
        print(self.inputProvinceName+'上报的第三方实验室机构(不区分检测机构)合计为：' + strResult)

    @classmethod
    def tearDownClass(cls):
        cls.cursor.close()
        cls.con.close()


if __name__ == '__main__':
    unittest.main()
