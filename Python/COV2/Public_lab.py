import pymysql, pymongo, unittest


class labCount(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # 上一日检测量
        cls.areaYesterdaydetection = []
        cls.total = 0
        cls.inputDate = input('输入检测日期，格式20201002')
        cls.intDate = int(cls.inputDate)
        cls.total = 0
        cls.dataList = []
        cls.areaDetection = []
        cls.belongArea = ['belong_area_0001', 'belong_area_0002', 'belong_area_0003', 'belong_area_0004',
                          'belong_area_0005', 'belong_area_0006', 'belong_area_0007', 'belong_area_0008']
        # 连接MySQL
        cls.mysqlCon = pymysql.connect(host='8.129.173.137', port=3306, user='cov_report_test',
                                       password='test_udRQIHuW7v', database='cov_report_test')
        cls.cursor = cls.mysqlCon.cursor()
        # 连接Mongo
        cls.mongoCon = pymongo.MongoClient('8.129.173.137', 27017)
        cls.mydb = cls.mongoCon['cov_report_test']
        cls.mydb.authenticate('cov_report_test', 'test_udRQIHuW7v')
        cls.mycol = cls.mydb['workload_report']

    def test01(self):
        for belong in self.belongArea:
            sql = "SELECT lab_id from report_lab_info_ext where lab_id in " \
                  "(SELECT lab_id  from report_workload_record where  test_time = '%s'  and flow_status = 2 ) " \
                  "and public_testing_lab = 1 and belong_area='%s'" % (self.inputDate, belong)
            self.cursor.execute(sql)
            result = self.cursor.fetchall()
            self.mysqlCon.commit()
            for i in range(0, len(result)):
                # print(result[i][0])
                self.dataList.append(result[i][0])
            # print(self.dataList)
            # 分区检测量
            collectionSql = [
                {'$match': {'flowStatus': 2, "lab.labId": {"$in": self.dataList},
                            '$and': [{'testDate': self.intDate}]}},
                {'$group': {'_id': 'null', 'sum': {'$sum': '$reportResult.B1'}}}, {'$sort': {'sum': 1}}]
            # print(collectionSql)
            mongoResult = self.mycol.aggregate(collectionSql)
            for i in mongoResult:
                # print(i)
                self.areaDetection.append(i['sum'])
            # 未处理标本
            # notDealed=[
            #     {'$match': {'flowStatus': 2, "lab.labId": {"$in": dataList}, '$and': [{'testDate': 20201002}]}},
            #     {'$group': {'_id': 'null', 'sum': {'$sum': '$reportResult.F2'}}}, {'$sort': {'sum': 1}}]
            # notDealedresult = mycol.aggregate(notDealed)
            # for i in  notDealedresult:
            #     print(i)
            self.dataList.clear()
        print(self.areaDetection)
        for totalDetection in self.areaDetection:
            self.total = self.total + totalDetection
        self.total = str(self.total)
        print('【公共检测实验室】当日总检测量为：' + self.total)

    def test02(self):
        print(1)

    @classmethod
    def tearDownClass(cls):
        cls.cursor.close()
        cls.mysqlCon.close()

    if __name__ == '__main__':
        unittest.main()
