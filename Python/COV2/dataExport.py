import pymysql
import pymongo
import unittest


class Cov2(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # 检测日期
        # cls.testDate = input('输入检测日期，格式：20201020')
        cls.testDate = str(20201020)
        # 连接MySQL
        cls.mysqlCon = pymysql.connect(host='8.129.173.137', port=3306, user='cov_report_test',
                                       password='test_udRQIHuW7v', database='cov_report_test')
        cls.cursor = cls.mysqlCon.cursor()
        # 连接Mongo
        cls.mongoCon = pymongo.MongoClient('8.129.173.137', 27017)
        cls.mydb = cls.mongoCon['cov_report_test']
        cls.mydb.authenticate('cov_report_test', 'test_udRQIHuW7v')
        cls.mycol = cls.mydb['workload_report']

    # def testmessageRemind(self):
    #     # 未上报机构
    #     notReportlabSql = "SELECT COUNT(*) from report_lab_info where enabled = 1 and id not in " \
    #                       "(SELECT lab_id from report_workload_record where test_time = '%s' and flow_status in( 0,2))"%(self.testDate)
    #     self.cursor.execute(notReportlabSql)
    #     notReportlabData =self.cursor.fetchall()[0][0]
    #     # notReportlabData=notReportlabDat
    #     print(notReportlabData)
    #     #管理机构未审核
    #     notAuditmgrSql = "SELECT COUNT(DISTINCT t3.mgr_code) from report_workload_record t1 join report_lab_info t2 on t1.lab_id = t2.id " \
    #                      "join report_mgr_info t3 on t3.mgr_code = t2.mgr_code  where t1.test_day = '%s' and t1.flow_status = 0"%(self.testDate)
    #     self.cursor.execute(notAuditmgrSql)
    #     notAuditmgrData =self.cursor.fetchall()[0][0]
    #     self.mysqlCon.commit()
    #     print(notAuditmgrData)
    ## 导出机构级别-工作量（检测机构）
    def testLabData(self):
        # nationSql = [{'$match': {'flowStatus': 2, 'testDate': 20201014,
        #                          'lab.instFunction': {'$in': ['inst_function_0002', 'inst_function_0003']}}},
        #              {'$group': {'_id': 'null', 'workload': {'$sum': '$reportResult.B1'}}}, {'$sort': {'_id': 1}}]
        # nationData = self.mycol.aggregate(nationSql)
        # for nationResult in nationData:
        #     print(nationResult['workload'])
        perProvincesql = [{
            '$match': {
                'flowStatus': 2,
                'testDate': 20201014,
                'lab.instFunction': {'$in': ['inst_function_0002', 'inst_function_0003']}
            }}, {'$group': {
            '_id': {'provinceCode': '$lab.provinceCode', 'instCategory': '$lab.instCategory'},
            'workload': {'$sum': '$reportResult.B1'}}}, {'$sort': {'_id': 1}}]
        perProvincedata = self.mycol.aggregate(perProvincesql)
        for perProvinceResult in perProvincedata:
            print(perProvinceResult)
    @classmethod
    def tearDownClass(cls):
        cls.cursor.close()
        cls.mysqlCon.close()


if __name__ == '__main__':
    unittest.main()
