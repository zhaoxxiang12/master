from COV2.report_Casse import *

class performCase():
    def __init__(self):
        self.Case = Case()
        self.testDate = 20201217
        self.AreaName = '武侯'
        self.intDate = 20201217
        self.reportDate = '7月1日'
        self.yesterdate = 20201217
        self.intStartdate = 20201201
        self. realStartdate = '7月1日'
    def startCase(self):
        self.Case.testSpecialArea(self.testDate, self.AreaName, self.intDate, self.reportDate,
                                  self.yesterdate, self.intStartdate, self.realStartdate)
if __name__ == '__main__':
    startCase = performCase()
    startCase.startCase()