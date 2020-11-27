from COV2.report_Casse import *
import time
import datetime
class performCase():
    def __init__(self):
        self.Case = Case()
        while True:
            # 检测日期
            self.inputDate = input('输入检测日期，格式20201002')
            self.startDate = str(input('输入开始时间：格式20201001'))
            try:
                if ':' in self.inputDate or ':' in self.startDate:
                    time.strptime(self.inputDate, "%Y-%m-%d %H:%M:%S")
                    time.strptime(self.startDate, "%Y-%m-%d %H:%M:%S")
                else:
                    time.strptime(self.inputDate, '%Y%m%d')
                    time.strptime(self.startDate, '%Y%m%d')
                    break
            except Exception as e:
                print(e)
                print('日期格式不正确，重新输入')
        self.inputName = input('输入省份名称')
        # cls.testDate = 20201001
        self.intDate = int(self.inputDate)
        self.yesterday = datetime.datetime.strptime(self.inputDate, "%Y%m%d")
        self.reportDate = self.yesterday.strftime('%m{m}%d{d}').format(m='月', d='日')
        self.yesterdate = int((self.yesterday + datetime.timedelta(days=-1)).strftime("%Y%m%d"))
        print(self.yesterdate)
        self.testDate = str(self.inputDate)
        self.intStartdate = int(self.startDate)
        self.startDate = datetime.datetime.strptime(self.startDate, '%Y%m%d')
        self.realStartdate = self.startDate.strftime('%m{m}%d{d}').format(m='月', d='日')
    def startCase(self):
        provinceJudge = input('是否需要生成省份测试报告')
        if provinceJudge == '是':
            self.Case.testSpecialpovince(self.inputName)
            self.Case.testWorkload(self.testDate)
        else:
            self.Case.testNation(self.testDate)
            self.Case.testWorkload(self.yesterdate,self.intDate,self.reportDate)
if __name__ == '__main__':
    startCase = performCase()
    startCase.startCase()
