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
        while True:
            provinceJudge = input('是否需要生成省份测试报告:1.是 2.否')
            cityJudge = input('是否需要生成城市测试报告:1.是 2.否')
            areaJudge = input('是否需要生成区县测试报告:1.是 2.否')
            if provinceJudge == '1'and cityJudge == '1' and areaJudge =='1':
                self.inputProvinceName = input('输入省份名称')
                self.inputCityName = input('请输入城市名称')
                self.inputAreaName = input('请输入区县名称')
                self.Case.testNation(self.testDate)
                self.Case.testWorkload(self.yesterdate, self.intDate, self.reportDate)
                self.Case.testSpecialpovince(self.testDate, self.inputProvinceName, self.intDate, self.reportDate,
                                             self.yesterdate, self.intStartdate, self.realStartdate)
                self.Case.testSpecialCity(self.testDate, self.inputCityName, self.intDate, self.reportDate,
                                             self.yesterdate, self.intStartdate, self.realStartdate)
                self.Case.testSpecialArea(self.testDate, self.inputAreaName, self.intDate, self.reportDate,
                                             self.yesterdate, self.intStartdate, self.realStartdate)
                break
            elif provinceJudge=='1'and cityJudge == '1' and areaJudge =='2' :
                self.inputProvinceName = input('输入省份名称')
                self.inputCityName = input('请输入城市名称')
                self.Case.testNation(self.testDate)
                self.Case.testWorkload(self.yesterdate, self.intDate, self.reportDate)
                self.Case.testSpecialpovince(self.testDate, self.inputProvinceName, self.intDate, self.reportDate,
                                             self.yesterdate, self.intStartdate, self.realStartdate)
                self.Case.testSpecialCity(self.testDate, self.inputCityName, self.intDate, self.reportDate,
                                          self.yesterdate, self.intStartdate, self.realStartdate)
                break
            elif provinceJudge == '2' and cityJudge == '1' and areaJudge == '1':
                self.inputCityName = input('请输入城市名称')
                self.inputAreaName = input('请输入区县名称')
                self.Case.testNation(self.testDate)
                self.Case.testWorkload(self.yesterdate, self.intDate, self.reportDate)
                self.Case.testSpecialCity(self.testDate, self.inputCityName, self.intDate, self.reportDate,
                                          self.yesterdate, self.intStartdate, self.realStartdate)
                self.Case.testSpecialArea(self.testDate, self.inputAreaName, self.intDate, self.reportDate,
                                          self.yesterdate, self.intStartdate, self.realStartdate)
                break
            elif provinceJudge == '2' and cityJudge == '1' and areaJudge == '2':
                self.inputCityName = input('请输入城市名称')
                self.Case.testNation(self.testDate)
                self.Case.testWorkload(self.yesterdate, self.intDate, self.reportDate)
                self.Case.testSpecialCity(self.testDate, self.inputCityName, self.intDate, self.reportDate,
                                          self.yesterdate, self.intStartdate, self.realStartdate)
                break
            elif provinceJudge == '2'and cityJudge == '2' and areaJudge =='1':
                self.inputAreaName = input('请输入区县名称')
                self.Case.testNation(self.testDate)
                self.Case.testWorkload(self.yesterdate, self.intDate, self.reportDate)
                self.Case.testSpecialArea(self.testDate, self.inputAreaName, self.intDate, self.reportDate,
                                             self.yesterdate, self.intStartdate, self.realStartdate)
                break
            elif provinceJudge == '1'and cityJudge == '2' and areaJudge =='2':
                self.inputProvinceName = input('输入省份名称')
                self.Case.testNation(self.testDate)
                self.Case.testWorkload(self.yesterdate, self.intDate, self.reportDate)
                self.Case.testSpecialpovince(self.testDate, self.inputProvinceName, self.intDate, self.reportDate,
                                             self.yesterdate, self.intStartdate, self.realStartdate)
                break
            elif provinceJudge == '1' and cityJudge == '1' and areaJudge == '2':
                self.inputProvinceName = input('输入省份名称')
                self.inputCityName = input('请输入城市名称')
                self.Case.testNation(self.testDate)
                self.Case.testWorkload(self.yesterdate, self.intDate, self.reportDate)
                self.Case.testSpecialpovince(self.testDate, self.inputProvinceName, self.intDate, self.reportDate,
                                             self.yesterdate, self.intStartdate, self.realStartdate)
                self.Case.testSpecialCity(self.testDate, self.inputCityName, self.intDate, self.reportDate,
                                          self.yesterdate, self.intStartdate, self.realStartdate)
                break
            elif provinceJudge == '1' and cityJudge == '2' and areaJudge == '1':
                self.inputProvinceName = input('输入省份名称')
                self.inputAreaName = input('请输入区县名称')
                self.Case.testNation(self.testDate)
                self.Case.testWorkload(self.yesterdate, self.intDate, self.reportDate)
                self.Case.testSpecialpovince(self.testDate, self.inputProvinceName, self.intDate, self.reportDate,
                                             self.yesterdate, self.intStartdate, self.realStartdate)
                self.Case.testSpecialCity(self.testDate, self.inputCityName, self.intDate, self.reportDate,
                                          self.yesterdate, self.intStartdate, self.realStartdate)
                self.Case.testSpecialArea(self.testDate, self.inputAreaName, self.intDate, self.reportDate,
                                          self.yesterdate, self.intStartdate, self.realStartdate)
                break
            elif provinceJudge == '2' and cityJudge == '2' and areaJudge == '2':
                self.Case.testNation(self.testDate)
                self.Case.testWorkload(self.yesterdate, self.intDate, self.reportDate)
                break
            else:
                print("输入有误，请重新输入")


if __name__ == '__main__':
    startCase = performCase()
    startCase.startCase()
