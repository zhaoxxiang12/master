import pymongo
import pymysql

class Common():
    def __init__(cls):
        cls.mysqlCon = pymysql.connect(host='8.129.173.137', port=3306, user='cov_report_test',
                                        password='test_udRQIHuW7v', database='cov_report_test')
        cls.mongoCon = pymongo.MongoClient('8.129.173.137', 27017)
        cls.mydb = cls.mongoCon['cov_report_test']
        cls.mydb.authenticate('cov_report_test', 'test_udRQIHuW7v')
        cls.mycol = cls.mydb['workload_report']
    def connectMySQL(self,sql):
        self.cursor = self.mysqlCon.cursor()
        self.cursor.execute(sql)
        self.mysqlCon.commit()
        result = self.cursor.fetchall()
        return result
    def connectMongDB(self,mongSQL):
        mongResult = self.mycol.aggregate(mongSQL)
        return mongResult
