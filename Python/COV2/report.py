import pymysql, unittest, pymongo, datetime,time


class Cov2(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        while True:
        # 检测日期
            cls.inputDate = input('输入检测日期，格式20201002')
            cls.startDate = str(input('输入开始时间：格式20201001'))
            try:
                if ':' in cls.inputDate or ':' in cls.startDate:
                    time.strptime(cls.intDate, "%Y-%m-%d %H:%M:%S")
                    time.strptime(cls.startDate, "%Y-%m-%d %H:%M:%S")
                else:
                    time.strptime(cls.inputDate,'%Y%m%d')
                    time.strptime(cls.startDate,'%Y%m%d')
                    break
            except Exception as e:
                print(e)
                print('日期格式不正确，重新输入')
        cls.inputName = input('输入省份名称')
        # cls.testDate = 20201001
        cls.intDate = int(cls.inputDate)
        cls.yesterday = datetime.datetime.strptime(cls.inputDate, "%Y%m%d")
        cls.reportDate = cls.yesterday.strftime('%m{m}%d{d}').format(m='月', d='日')
        cls.yesterdate = int((cls.yesterday + datetime.timedelta(days=-1)).strftime("%Y%m%d"))
        cls.testDate = str(cls.inputDate)
        cls.intStartdate = int(cls.startDate)
        cls.startDate = datetime.datetime.strptime(cls.startDate,'%Y%m%d')
        cls.realStartdate = cls.startDate.strftime('%m{m}%d{d}').format(m='月', d='日')
        # 连接MySQL
        cls.mysqlCon = pymysql.connect(host='8.129.173.137', port=3306, user='cov_report_test',
                                       password='test_udRQIHuW7v', database='cov_report_test')
        cls.cursor = cls.mysqlCon.cursor()
        # 连接Mongo
        cls.mongoCon = pymongo.MongoClient('8.129.173.137', 27017)
        cls.mydb = cls.mongoCon['cov_report_test']
        cls.mydb.authenticate('cov_report_test', 'test_udRQIHuW7v')
        cls.mycol = cls.mydb['workload_report']

    def testNation(self):
        nationSql="SELECT COUNT(*) from report_workload_record t1 join report_lab_info_ext t2 on t1.lab_id = t2.lab_id  " \
                  "where t1.test_day = '%s' and t1.flow_status=2 and t2.inst_function in('inst_function_0002','inst_function_0003')"%(self.testDate)
        self.cursor.execute(nationSql)
        result = self.cursor.fetchall()
        self.mysqlCon.commit()
        result = result[0][0]
        strResult = str(result)
        # print(self.inputProvinceName + '上报的检测机构合计为：' + strResult)
        print('全国共有'+strResult+'家医疗卫生机构')
        medicalSql = "SELECT COUNT(*) from report_workload_record t1 join report_lab_info_ext t2 on t1.lab_id = t2.lab_id " \
                     "where t1.test_day =  '%s' and t1.flow_status =2 and t2.inst_category = 'inst_category_0001'  " \
                     "and (t2.inst_function = 'inst_function_0002' or t2.inst_function = 'inst_function_0003') "%(self.testDate)
        self.cursor.execute(medicalSql)
        medicalData = self.cursor.fetchall()
        self.mysqlCon.commit()
        medicalData= medicalData[0][0]
        medicalData = str( medicalData)
        # 医疗三级
        medicalThreelevel = "SELECT COUNT(*) from report_workload_record t1 join report_lab_info_ext t2 on t1.lab_id = t2.lab_id " \
                            "where t1.test_day = '%s' and t2.inst_category = 'inst_category_0001' and (t2.inst_function = 'inst_function_0002' " \
                            "or t2.inst_function = 'inst_function_0003') and t2.inst_class in ('inst_class_0002','inst_class_0003','inst_class_0004') " \
                            "and t1.flow_status = 2"%(self.testDate)
        self.cursor.execute(medicalThreelevel)
        threeLevel = self.cursor.fetchall()
        self.mysqlCon.commit()
        threeLevel =  threeLevel[0][0]
        threeLevel = str( threeLevel)
        # 医疗二级
        secondLevelsql = "SELECT COUNT(*) from report_workload_record t1 join report_lab_info_ext t2 on t1.lab_id = t2.lab_id " \
                         "where t1.test_day = '%s' and t2.inst_category = 'inst_category_0001' and (t2.inst_function = 'inst_function_0002' " \
                         "or t2.inst_function = 'inst_function_0003') and t2.inst_class in ('inst_class_0005','inst_class_0006','inst_class_0007') " \
                         "and t1.flow_status = 2"%(self.testDate)
        self.cursor.execute(secondLevelsql)
        secondlevelData = self.cursor.fetchall()
        self.mysqlCon.commit()
        secondlevelData  =  secondlevelData [0][0]
        secondlevelData  = str( secondlevelData )
      # 疾控
        CDCsql = "SELECT COUNT(*) from report_workload_record t1 join report_lab_info_ext t2 on t1.lab_id = t2.lab_id" \
                " where t1.test_day = '%s'and t2.inst_category = 'inst_category_0002' and (t2.inst_function = 'inst_function_0002' " \
                "or t2.inst_function = 'inst_function_0003') and t1.flow_status = 2"%(self.testDate)
        self.cursor.execute(CDCsql)
        CDCdata = self.cursor.fetchall()
        self.mysqlCon.commit()
        CDCdata =  CDCdata[0][0]
        CDCdata = str(CDCdata)
        # 第三方实验室实验室
        thirdLab = "SELECT COUNT(*) from report_workload_record t1 join report_lab_info_ext t2 on t1.lab_id = t2.lab_id" \
                   " where t1.test_day = '%s' and t2.inst_category = 'inst_category_0003' and (t2.inst_function = 'inst_function_0002' " \
                   "or t2.inst_function = 'inst_function_0003') and t1.flow_status = 2"%(self.testDate)
        self.cursor.execute(thirdLab)
        thirdLabdata = self.cursor.fetchall()
        self.mysqlCon.commit()
        thirdLabdata = thirdLabdata[0][0]
        thirdLabdata = str(thirdLabdata)
        print('医疗机构'+medicalData+'家（三级医院'+threeLevel+'家，'+'二级医院'+secondlevelData+'家）')
        print('疾控机构'+CDCdata+'家')
        print('第三方实验室'+thirdLabdata+'家')
    def testWorkload(self):
        datawork = []
        organData = []
        theThreedata = {}
        provinceCode = []
        provinceResult = []
        provinceName = []
        newProvincedata ={}
        thirdProvince = {}
        thirdProvinceName =[]
        thirdResult = []
        count = 0
        nationCollection = [{
            '$match': {
                'testDate': {'$gte': self.yesterdate, '$lte': self.intDate},
                'flowStatus': 2,
                'lab.instFunction': {
                    '$in': ['inst_function_0002', 'inst_function_0003']
                }}},
            {
                '$group': {
                    '_id': '$testDate',
                    'totalwork': {'$sum': '$reportResult.B1'}}}, {
                '$sort': {
                    '_id': 1}}]
        mongoResult = self.mycol.aggregate(nationCollection)
        for i in mongoResult:
            # print(i)
            # self.areaDetection.append(i['sum'])
            # print(i['totalwork'])
            datawork.append(i['totalwork'])
        # 检测日期数据
        aroundData = (round(datawork[1] / 10000, 0))
        # print(aroundData)
        # 差值
        differenceData = (datawork[1] - datawork[0])
        aroundDifference = abs(round(differenceData / 10000, 0))
        # print(aroundDifference)
        # print(differenceData)
        # 百分比
        percent = '{:.1f}%'.format(abs(differenceData / datawork[1] * 100))
        # print(percent)
        # 医疗、疾控和第三方实验室占比
        differenceOrgansql = [
            {
                '$match': {
                    'testDate': 20201001,
                    'flowStatus': 2,
                    'lab.instFunction': {
                        '$in': ['inst_function_0002', 'inst_function_0003']
                    }}},

            {
                '$group': {
                    '_id': '$lab.instCategory',
                    'totalwork': {
                        '$sum': '$reportResult.B1'
                    }}}, {
                '$sort': {
                    '_id': 1}}]
        organResult = self.mycol.aggregate(differenceOrgansql)
        for i in organResult:
            # print(i)
            organData.append(i['totalwork'])
            # self.dataList.clear()
        #    医疗检测量及占比
        aroundMedical = (round(organData[0] / 10000, 0))
        # print(aroundMedical)
        medicalPercent = '{:.1f}%'.format(abs(organData[0] / datawork[1] * 100))
        # print(medicalPercent)

        #     疾控检测量及占比
        aroundCDC = (round(organData[1] / 10000, 0))
        # print(aroundCDC)
        CDCPercent = '{:.1f}%'.format(abs(organData[1] / datawork[1] * 100))
        # print(CDCPercent)
        #     第三方实验室检测量及占比
        aroundThirdlab = (round(organData[2] / 10000, 0))
        # print(aroundThirdlab)
        thirdLabpercent = '{:.1f}%'.format(abs(organData[2] / datawork[1] * 100))
        # print(thirdLabpercent)
        # 检测量前三的省份
        theThreeprovince = [{
            '$match': {'testDate': self.intDate, 'flowStatus': 2, 'lab.instFunction': {
                '$in': ['inst_function_0002', 'inst_function_0003']}}},
            {'$group': {'_id': '$lab.provinceCode', 'totalwork': {'$sum': '$reportResult.B1'}}},
            {'$sort': {'totalwork': - 1}}, {'$limit': 3}]
        provinceData = self.mycol.aggregate(theThreeprovince)
        # 将查询到的数据存在一个空字典
        for data in provinceData:
            # print(data)
            theThreedata[data['_id']] = data['totalwork']
        newData = sorted(theThreedata.items(),key=lambda item:item[0],reverse=False)
        # 将newData转为字典
        for i in newData:
            newProvincedata[i[0]]=i[1]
        # print(newProvincedata)
        # 获取省份code
        for code in theThreedata.keys():
            provinceCode.append(code)
        # for name in provinceCode:
        provinceNamesql = "SELECT province_code,province_name from common_province where province_code in ('%s','%s','%s') ORDER BY province_code ASC"%(provinceCode[0],provinceCode[1],provinceCode[2])
        self.cursor.execute(provinceNamesql)
        province = self.cursor.fetchall()
        self.mysqlCon.commit()
        # print(province)
        for i in province:
            # print(i)
            provinceName.append(i[1])
        # print(provinceName)
        for key in newProvincedata:
            newProvincedata[provinceName[count]] = newProvincedata.pop(key)
            count =count + 1
        # 检测量从大到小排序
        newProvincedata = sorted(newProvincedata.items(), key=lambda item: item[1], reverse=True)
        for i in newProvincedata:
            thirdProvince[i[0]] = i[1]
        # print(thirdProvince)
        for name in thirdProvince.keys():
            thirdProvinceName.append(name)
        for result in thirdProvince.values():
            thirdResult.append(result)
        # 计算检测量前三的省份约为多少
        firstProvincevalue = round(thirdResult[0]/10000,0)
        secondProvincevalue = round(thirdResult[1]/10000,0)
        thirdProvincevalue = round(thirdResult[2]/10000,0)
        # print(newProvincedata)
        # print(theThreedata)

        if differenceData < 0:
            print(self.reportDate + '，全国新冠病毒核酸检测约' + str(aroundData) + '万人份,' + '较前一日减少了' + str(
                aroundDifference) + '万人份,' + '降低了' + percent)
            print('其中医疗机构检测约' + str(aroundMedical) + '万人份（占' + medicalPercent + '）,疾控机构约' + str(
                aroundCDC) + '万人份（占' + CDCPercent + '),'
                                                    '' + '第三方实验室约' + str(
                aroundThirdlab) + '万人份（占' + thirdLabpercent + ')')
        else:
            print(self.reportDate + '全国新冠病毒核酸检测约' + str(aroundData) + '万人份,' + '较前一日增加了' + str(
                aroundDifference)) + '万人份,' + '升高了' + percent
            print('其中医疗机构检测a约' + str(aroundMedical) + '万人份（占' + medicalPercent + '）,疾控机构约' + str(
                aroundCDC) + '万人份（占' + CDCPercent + '),'
                                                    '' + '第三方实验室约' + str(
                aroundThirdlab) + '万人份（占' + thirdLabpercent + ')')
        print('检测量位居前3名的分别为'+thirdProvinceName[0]+'(约'+str(firstProvincevalue)+'万人份)、'+thirdProvinceName[1]+'约('+str(secondProvincevalue)+'万人份)、'
                                                                                ''+thirdProvinceName[2]+'约('+str(thirdProvincevalue)+'万人份)。')
    def testSpecialpovince(self):
        testLoad = []
        compareDateresult =[]
        # 全省所有医疗卫生机构
        provinceSql = "SELECT  t1.province_code,t3.province_name,COUNT(*)  from report_workload_record t1 join report_lab_info_ext t2 " \
                      "on t1.lab_id = t2.lab_id join common_province t3 on t3.province_code = t1.province_code  " \
                      "where  t1.flow_status = 2 and t1.test_day = '%s' and t3.province_name like '%%%s%%'" \
                      "and t2.inst_function in('inst_function_0002','inst_function_0003') GROUP BY t1.province_code"%(self.testDate,self.inputName)
        self.cursor.execute(provinceSql)
        provinceResult = self.cursor.fetchall()
        # print(provinceResult)
        provinceCode = provinceResult[0][0]
        provinceName = provinceResult[0][1]
        provinceTotal = provinceResult[0][2]

        # 全省医疗机构
        medicalSql = "SELECT COUNT(*)  from report_workload_record t1 join report_lab_info_ext t2 on t1.lab_id = t2.lab_id " \
                     "join common_province t3 on t3.province_code = t1.province_code  where  t1.flow_status = 2 and " \
                     "t1.test_day ='%s' and t3.province_name like '%%%s%%' and t2.inst_function " \
                     "in('inst_function_0002','inst_function_0003')  and t2.inst_category = 'inst_category_0001'"%(self.testDate,self.inputName)
        self.cursor.execute(medicalSql)
        medicalResult = self.cursor.fetchall()[0][0]
        # 全省疾控机构
        CDCSql = "SELECT COUNT(*)  from report_workload_record t1 join report_lab_info_ext t2 on t1.lab_id = t2.lab_id " \
                 "join common_province t3 on t3.province_code = t1.province_code  where  t1.flow_status = 2 and " \
                 "t1.test_day = '%s' and t3.province_name like '%%%s%%' and t2.inst_function " \
                 "in('inst_function_0002','inst_function_0003')  and t2.inst_category = 'inst_category_0002'"%(self.testDate,self.inputName)
        self.cursor.execute(CDCSql)
        CDCResult = self.cursor.fetchall()[0][0]
        # 全省第三方实验室
        thirdLabsql = "SELECT COUNT(*)  from report_workload_record t1 join report_lab_info_ext t2 on t1.lab_id = t2.lab_id " \
                      "join common_province t3 on t3.province_code = t1.province_code  where  t1.flow_status = 2 and " \
                      "t1.test_day = '%s' and t3.province_name like '%%%s%%' and t2.inst_function " \
                      "in('inst_function_0002','inst_function_0003')  and t2.inst_category = 'inst_category_0003'"%(self.testDate,self.inputName)
        self.cursor.execute(thirdLabsql)
        thirdLabresult = self.cursor.fetchall()[0][0]
        self.mysqlCon.commit()
        #  全省样本人份
        provinceCol = [
            {
                '$match': {
                    'testDate': self.intDate,
                    'flowStatus': 2,
                    'lab.provinceCode': provinceCode}},

            {
                '$group': {
                    '_id': 'null',
                    'totalwork': {
                        '$sum': '$reportResult.B1'
                    }}}
        ]
        totalServings = self.mycol.aggregate(provinceCol)
        for i in totalServings:
            totalServings = i['totalwork']
        aroundTotalservings = round(totalServings/10000,1)
        #  医疗机构样本人份
        medicalCol = [    {
        '$match': {
            'testDate':self.intDate,
						'flowStatus':2,
						'lab.provinceCode':provinceCode,
						'lab.instCategory':'inst_category_0001',
					}},

						{
						'$group':{
						'_id':'null',
						'totalwork':{
						'$sum':'$reportResult.B1'
						}}}]
        medicalServings = self.mycol.aggregate(medicalCol)
        for i in medicalServings:
            medicalServings = i['totalwork']
        aroundMedicalservings = round(medicalServings/10000,1)
        medicalPercent = '{:.1f}%'.format(medicalServings/totalServings * 100)
        #   疾控样本人份
        CDCcol = [   {
        '$match': {
            'testDate':self.intDate,
						'flowStatus':2,
						'lab.provinceCode':provinceCode,
						'lab.instCategory':'inst_category_0002',
						}},

						{
						'$group':{
						'_id':'null',
						'totalwork':{
						'$sum':'$reportResult.B1'
						}}}]
        CDCservings = self.mycol.aggregate(CDCcol)
        for i in  CDCservings:
            CDCservings = i['totalwork']
        aroundCDCservings = round(CDCservings/10000,1)
        CDCpercent = '{:.1f}%'.format(CDCservings/totalServings * 100)
        #   第三方实验室样本人份
        thirdLabcol = [ {
        '$match': {
            'testDate':self.intDate,
						'flowStatus':2,
						'lab.provinceCode':provinceCode,
						'lab.instCategory':'inst_category_0003',
						}},

						{
						'$group':{
						'_id':'null',
						'totalwork':{
						'$sum':'$reportResult.B1'
						}}}]
        thirdLabservings = self.mycol.aggregate(thirdLabcol)
        for i in thirdLabservings:
            thirdLabservings = i['totalwork']
        aroundThirdlabServings = round(thirdLabservings/10000,1)
        thirdLabpercent =  '{:.1f}%'.format(thirdLabservings/totalServings * 100)
        print(self.reportDate+'0时至24时,我委收到'+provinceName+str(provinceTotal)+'家卫生医疗机构上报新冠病毒核酸检测数据，其中医疗机构'+str(medicalResult)+'家,疾控机构'+str(CDCResult)+'家,第三方实验室'+str(thirdLabresult)+'家.')
        print('共检测样本'+str(aroundTotalservings)+'万人份,其中医疗机构检测'+str(aroundMedicalservings)+'万人份（占'+medicalPercent+')，疾控机构检测'+str(aroundCDCservings)+'万人份，（占'+CDCpercent+'），第三方实验室检测'+str(thirdLabservings)+'万人份占（'+thirdLabpercent+'）。')
         #   省份检测量
        workloadCol = [ {
        '$match': {
            'testDate':{'$gte':self.yesterdate,'$lte':self.intDate},
						'flowStatus':2,
						'lab.provinceCode':provinceCode}},

						{
						'$group':{
						'_id':'$testDate',
						'totalwork':{
						'$sum':'$reportResult.B1'
						}}},{
						'$sort':{
						'totalwork':-1}}]
        workloadResult = self.mycol.aggregate(workloadCol)
        for i in workloadResult:
            testLoad.append(i['totalwork'])
        aroundTestload = round(testLoad[1]/10000,1)
        aroundYesterdayresult = round(testLoad[0]/10000,1)
        compareData = testLoad[1]-testLoad[0]
        workloadPercent ='{:.1f}%'.format(abs(compareData) / testLoad[0]  * 100)
        if compareData < 0:
            print(provinceName+'检测量达'+str(aroundTestload)+'万人份,比前一日'+'('+str(aroundYesterdayresult)+'万人份)降低了'+workloadPercent)
        else:
            print(provinceName+'检测量达'+str(aroundTestload)+'万人份,比前一日'+'('+str(aroundYesterdayresult)+'万人份)升高了'+workloadPercent)

        #   省份检测量(开始时间)
        workloadCol = [{
            '$match': {
                'testDate':self.intStartdate ,
                'flowStatus': 2,
                'lab.provinceCode': provinceCode}},

            {
                '$group': {
                    '_id': 'null',
                    'totalwork': {
                        '$sum': '$reportResult.B1'
                    }}}, {
                '$sort': {
                    'totalwork': -1}}]
        startWorkload = self.mycol.aggregate(workloadCol)
        for i in startWorkload:
            startWorkload = i['totalwork']
        aroundStartworkload = round(startWorkload/1000,1)
        startPercent = '{:.0f}%'.format(abs(testLoad[1]-startWorkload)/startWorkload * 100)
        if testLoad[1] - startWorkload < 0:
            print('比'+self.realStartdate+'('+str(aroundStartworkload)+'万人份'+')降低了'+startPercent)
        else:
            print('比' + self.realStartdate + '(' + str(aroundStartworkload) + '万人份' + ')升高了' + startPercent)
    @classmethod
    def tearDownClass(cls):
        cls.cursor.close()
        cls.mysqlCon.close()


if __name__ == '__main__':
    unittest.main()
