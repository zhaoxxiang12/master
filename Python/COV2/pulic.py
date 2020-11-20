import pymysql, unittest, pymongo, datetime


class Optimization(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # 上一日检测量
        cls.areaYesterdaydetection = []
        cls.total = 0
        cls.inputDate = input('输入检测日期，格式20201002')
        cls.intDate = int(cls.inputDate)
        cls.yesterday = datetime.datetime.strptime(cls.inputDate, "%Y%m%d")
        cls.yesterdate = int((cls.yesterday + datetime.timedelta(days=-1)).strftime("%Y%m%d"))
        cls.total = 0
        cls.dataList = []
        cls.areaDetection = []
        cls.todayTotal = []
        # 上一日检测量
        cls.lastTotal = []
        cls.yesterdayTotal = 0
        # 昨天检测量
        cls.realTotal = []
        cls.belongArea = ['belong_area_0001', 'belong_area_0002', 'belong_area_0003', 'belong_area_0004',
                          'belong_area_0005', 'belong_area_0006', 'belong_area_0007', 'belong_area_0008']
        cls.dataBase = 'cov_report_test'
        cls.host = '8.129.173.137'
        cls.userName = 'cov_report_test'
        cls.passWord = 'test_udRQIHuW7v'
        cls.con = pymysql.connect(host=cls.host, port=3306, user=cls.userName, password=cls.passWord,
                                  database=cls.dataBase)
        cls.cursor = cls.con.cursor()
        # 连接Mongo
        cls.mongoCon = pymongo.MongoClient('8.129.173.137', 27017)
        cls.mydb = cls.mongoCon['cov_report_test']
        cls.mydb.authenticate('cov_report_test', 'test_udRQIHuW7v')
        cls.mycol = cls.mydb['workload_report']

    # 昨天检测量
    def test01(self):
        for belong in self.belongArea:
            sql = "SELECT lab_id from report_lab_info t1 " \
                  "join report_lab_info_ext  t2 on t1.id = t2.lab_id   " \
                  "join  belong_area_region t3 on t3.province_code = t1.province_code " \
                  "WHERE t2.public_testing_lab =1 and t1.enabled =1 and t3.belong_area = '%s'" % (
                belong)
            self.cursor.execute(sql)
            result = self.cursor.fetchall()
            self.con.commit()
            for i in range(0, len(result)):
                # print(result[i][0])
                self.dataList.append(result[i][0])
            # print(self.dataList)
            # 分区检测量
            collectionSql = [
                {'$match': {'flowStatus': 2, "lab.labId": {"$in": self.dataList},
                            '$and': [{'testDate': self.intDate}]}},
                {'$group': {'_id': 'null', 'sum': {'$sum': '$reportResult.B1'}}}, {'$sort': {'sum': 1}}]
            mongoResult = self.mycol.aggregate(collectionSql)
            for i in mongoResult:
                self.areaDetection.append(i['sum'])
                # print(i['sum'])
            self.dataList.clear()
        for totalDetection in self.areaDetection:
            self.total = self.total + totalDetection
        self.total = str(self.total)
        self.realTotal.append(self.total)
        print('【公共检测实验室】当日总检测量为：' + self.realTotal[0])

    # 上一日检测量
    def test02(self):
        # 将上一次的记录清空
        self.areaDetection.clear()
        for belong in self.belongArea:
            sql = "SELECT lab_id from report_lab_info t1 join report_lab_info_ext  t2 on t1.id = t2.lab_id   " \
                  "join  belong_area_region t3 on t3.province_code = t1.province_code " \
                  "WHERE t2.public_testing_lab =1 and t1.enabled =1 and t3.belong_area = '%s'" % (
                belong)
            self.cursor.execute(sql)
            result = self.cursor.fetchall()
            self.con.commit()
            for i in range(0, len(result)):
                self.dataList.append(result[i][0])
            # 分区检测量
            collectionSql = [
                {'$match': {'flowStatus': 2, "lab.labId": {"$in": self.dataList},
                            '$and': [{'testDate': self.yesterdate}]}},
                {'$group': {'_id': 'null', 'sum': {'$sum': '$reportResult.B1'}}}, {'$sort': {'sum': 1}}]
            mongoResult = self.mycol.aggregate(collectionSql)
            for i in mongoResult:
                # print(i)
                self.areaDetection.append(i['sum'])
            self.dataList.clear()
        for totalDetection in self.areaDetection:
            self.yesterdayTotal = self.yesterdayTotal + totalDetection
        self.yesterdayTotal = str(self.yesterdayTotal)
        print('【公共检测实验室】上一日总检测量为：' + self.yesterdayTotal)
        self.lastTotal.append(self.yesterdayTotal)

    # 判断公共检测实验室检测量增加还是减少
    def test03(self):
        total = int(self.realTotal[0])
        lastToal = int(self.lastTotal[0])
        difference = total - lastToal
        absDifference = abs(difference)
        strDifference = str(absDifference)
        # print(total,lastToal)
        if difference < 0:
            print('较上一日减少了' + strDifference)
        else:
            print('较上一日增加了' + strDifference)
        self.realTotal.clear()
        self.lastTotal.clear()
        # print(self.realTotal, self.lastTotal)

    @classmethod
    def tearDownClass(cls):
        cls.cursor.close()
        cls.con.close()


if __name__ == '__main__':
    unittest.main()
    suite = unittest.TestSuite()
    runner = unittest.TextTestRunner()
    suite.addTest(Optimization('test01'))
    suite.addTest(Optimization('test02'))
    suite.addTest(Optimization('test03'))
    runner.run(suite)
