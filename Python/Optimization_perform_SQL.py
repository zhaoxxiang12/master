import xlrd,time,unittest,cx_Oracle
class Optimization(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.con=cx_Oracle.connect('zhaoxiaoxiang/123456@192.168.5.134:1521/orcl')
        cls.cur=cx_Oracle.Cursor(cls.con)
    def read_excel(self):
        Excel_Path = r'E:\Python Files\DTU_DATABASE\SQL语句表.xlsx'
        data = xlrd.open_workbook(Excel_Path)
        sheet = data.sheets()[0]
        # 存储SQL语句的列表
        newdata = []
        # return sheet
        # 将Excel列表中的SQL语句循环出来并添加到存储SQL语句的列表中
        for i in range(1, sheet.nrows):
            datalist = sheet.row_values(i)
            id = datalist[0]  # sql语句编号
            sql = datalist[1]  # sql语句
            # print(sql)
            # print(id)
            newdata.append(sql)  # 将Excel中SQL语句添加到列表中
            # print(sql)
        # print(newdata[8])
        return newdata  # 将列表中的SQL语句返回，以便后续执行SQL时调用
    def test_01(self):
        sql=self.read_excel()
        for i in range(0,len(sql)):
            sql_execute=sql[i]
            try:
                result1='执行成功'
                print('正在执行'+sql_execute)
                time.sleep(1)
                self.cur.execute(sql_execute)
                print('执行成功'+sql_execute)
                #调用日志函数log
                self.log(sql_execute,result1)
            except:
                result2='执行失败'
                print('执行失败'+sql_execute)
                #调用日志函数log
                self.log(sql_execute,result2)
    #记录运行SQL语句日志
    def log(self,sql,result):
        with open('log.txt', 'a', encoding='utf8') as f:
            f.write(sql+result+'\n')

    @classmethod
    def tearDownClass(cls):
         cls.cur.close()
         cls.con.close()
if __name__ == '__main__':
    unittest.main()