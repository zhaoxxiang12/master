from COV2.reportCommon import *


class publicLab():
    def __init__(self):
        self.Common = Common()
        self.date = 20201217

    def firstArea(self):
        firstAreaLab = []
        firstAreaSQL = "SELECT lab_id from belong_area_region t1 join report_lab_info t2 on t1.province_code = t2.province_code join report_lab_info_ext t3 on t3.lab_id = t2.id where t2.enabled = 1 and t1.belong_area = 'belong_area_0001' and t3.public_testing_lab = 1; "
        labId = self.Common.connectMySQL(firstAreaSQL)

        for i in range(0, len(labId)):
            # print(labId[i][0])
            firstAreaLab.append(labId[i][0])
        collectionSql = [
            {'$match': {'flowStatus': 2, "lab.labId": {"$in": firstAreaLab},
                        '$and': [{'testDate': self.date}]}},
            {'$group': {'_id': 'null', 'sum': {'$sum': '$reportResult.B1'}}}, {'$sort': {'sum': 1}}]
        firstAreaWorkload = self.Common.connectMongDB(collectionSql)
        for firstAreaResult in firstAreaWorkload:
            print('第一分区检测量：' + str(firstAreaResult['sum']))

        strLabId = ",".join(str(i) for i in firstAreaLab)  # 整数列表转换成字符串列表
        # print(strLabId)
        # 阳性案例
        COVSql = "select count(*) from report_cov_cases where lab_id in ({}) and flow_status = 2 and test_day in ({})".format(strLabId,
                                                                                                         self.date)
        COVData = self.Common.connectMySQL(COVSql)[0][0]
        # print(COVSql)
        # 上报机构数
        reportedLabSql = "select count(*) from report_workload_record where lab_id in ({}) and flow_status = 2 and test_day in ({})".format(
            strLabId, self.date)
        reportedLabResult = self.Common.connectMySQL(reportedLabSql)[0][0]
        print("第一分区上报机构数：" + str(reportedLabResult))
        print("第一分区的阳性数：" + str(COVData))

    def secondArea(self):
        secondAreaLab = []
        secondAreaSQL = " SELECT lab_id from belong_area_region t1 join report_lab_info t2 on t1.province_code = t2.province_code " \
                        "join report_lab_info_ext t3 on t3.lab_id = t2.id " \
                        "where t2.enabled = 1 and t1.belong_area = 'belong_area_0002' and t3.public_testing_lab = 1; "
        labId = self.Common.connectMySQL(secondAreaSQL)
        for i in range(0, len(labId)):
            # print(labId[i][0])
            secondAreaLab.append(labId[i][0])
        # print(firstAreaLab)
        collectionSql = [
            {'$match': {'flowStatus': 2, "lab.labId": {"$in": secondAreaLab},
                        '$and': [{'testDate': self.date}]}},
            {'$group': {'_id': 'null', 'sum': {'$sum': '$reportResult.B1'}}}, {'$sort': {'sum': 1}}]
        firstAreaWorkload = self.Common.connectMongDB(collectionSql)
        for firstAreaResult in firstAreaWorkload:
            print('第二分区检测量：' + str(firstAreaResult['sum']))
        strLabId = ",".join(str(i) for i in secondAreaLab)  # 整数列表转换成字符串列表
        # 阳性案例
        COVSql = "select count(*) from report_cov_cases where lab_id in ({}) and flow_status = 2 and test_day in ({})".format(strLabId,
                                                                                                          self.date)
        COVData = self.Common.connectMySQL(COVSql)[0][0]
        # 上报机构数
        reportedLabSql = "select count(*) from report_workload_record where lab_id in ({}) and flow_status = 2 and test_day in ({})".format(
            strLabId, self.date)
        reportedLabResult = self.Common.connectMySQL(reportedLabSql)[0][0]
        print("第二分区上报机构数：" + str(reportedLabResult))
        print("第二分区的阳性数：" + str(COVData))

    def thirdArea(self):
        thirdAreaLab = []
        thirdAreaSQL = " SELECT lab_id from belong_area_region t1 join report_lab_info t2 on t1.province_code = t2.province_code " \
                       "join report_lab_info_ext t3 on t3.lab_id = t2.id " \
                       "where t2.enabled = 1 and t1.belong_area = 'belong_area_0003' and t3.public_testing_lab = 1; "
        labId = self.Common.connectMySQL(thirdAreaSQL)
        for i in range(0, len(labId)):
            # print(labId[i][0])
            thirdAreaLab.append(labId[i][0])
        # print(firstAreaLab)
        collectionSql = [
            {'$match': {'flowStatus': 2, "lab.labId": {"$in": thirdAreaLab},
                        '$and': [{'testDate': self.date}]}},
            {'$group': {'_id': 'null', 'sum': {'$sum': '$reportResult.B1'}}}, {'$sort': {'sum': 1}}]
        firstAreaWorkload = self.Common.connectMongDB(collectionSql)
        for firstAreaResult in firstAreaWorkload:
            print('第三分区检测量：' + str(firstAreaResult['sum']))
        strLabId = ",".join(str(i) for i in thirdAreaLab)  # 整数列表转换成字符串列表
        # 阳性案例
        COVSql = "select count(*) from report_cov_cases where lab_id in ({}) and flow_status = 2 and test_day in ({})".format(strLabId,
                                                                                                          self.date)
        COVData = self.Common.connectMySQL(COVSql)[0][0]
        # 上报机构数
        reportedLabSql = "select count(*) from report_workload_record where lab_id in ({}) and flow_status = 2 and test_day in ({})".format(
            strLabId, self.date)
        reportedLabResult = self.Common.connectMySQL(reportedLabSql)[0][0]
        print("第三分区上报机构数：" + str(reportedLabResult))
        print("第三分区的阳性数：" + str(COVData))

    def fourthArea(self):
        fourthAreaLab = []
        fourthAreaSQL = " SELECT lab_id from belong_area_region t1 join report_lab_info t2 on t1.province_code = t2.province_code " \
                       "join report_lab_info_ext t3 on t3.lab_id = t2.id " \
                       "where t2.enabled = 1 and t1.belong_area = 'belong_area_0004' and t3.public_testing_lab = 1; "
        labId = self.Common.connectMySQL(fourthAreaSQL)
        for i in range(0, len(labId)):
            # print(labId[i][0])
            fourthAreaLab.append(labId[i][0])
        # print(firstAreaLab)
        collectionSql = [
            {'$match': {'flowStatus': 2, "lab.labId": {"$in": fourthAreaLab},
                        '$and': [{'testDate': self.date}]}},
            {'$group': {'_id': 'null', 'sum': {'$sum': '$reportResult.B1'}}}, {'$sort': {'sum': 1}}]
        firstAreaWorkload = self.Common.connectMongDB(collectionSql)
        for firstAreaResult in firstAreaWorkload:
            print('第四分区检测量：' + str(firstAreaResult['sum']))
        strLabId = ",".join(str(i) for i in fourthAreaLab)  # 整数列表转换成字符串列表
        # 阳性案例
        COVSql = "select count(*) from report_cov_cases where lab_id in ({}) and flow_status = 2 and test_day in ({})".format(strLabId,
                                                                                                          self.date)
        COVData = self.Common.connectMySQL(COVSql)[0][0]
        # 上报机构数
        reportedLabSql = "select count(*) from report_workload_record where lab_id in ({}) and flow_status = 2 and test_day in ({})".format(
            strLabId, self.date)
        reportedLabResult = self.Common.connectMySQL(reportedLabSql)[0][0]
        print("第四分区上报机构数：" + str(reportedLabResult))
        print("第四分区的阳性数：" + str(COVData))
    def fifthtArea(self):
        fifthAreaLab = []
        fifthAreaSQL = " SELECT lab_id from belong_area_region t1 join report_lab_info t2 on t1.province_code = t2.province_code " \
                       "join report_lab_info_ext t3 on t3.lab_id = t2.id " \
                       "where t2.enabled = 1 and t1.belong_area = 'belong_area_0005' and t3.public_testing_lab = 1; "
        labId = self.Common.connectMySQL(fifthAreaSQL)
        for i in range(0, len(labId)):
            # print(labId[i][0])
            fifthAreaLab.append(labId[i][0])
        # print(firstAreaLab)
        collectionSql = [
            {'$match': {'flowStatus': 2, "lab.labId": {"$in": fifthAreaLab},
                        '$and': [{'testDate': self.date}]}},
            {'$group': {'_id': 'null', 'sum': {'$sum': '$reportResult.B1'}}}, {'$sort': {'sum': 1}}]
        firstAreaWorkload = self.Common.connectMongDB(collectionSql)
        for firstAreaResult in firstAreaWorkload:
            print('第五分区检测量：' + str(firstAreaResult['sum']))
        strLabId = ",".join(str(i) for i in fifthAreaLab)  # 整数列表转换成字符串列表
        # 阳性案例
        COVSql = "select count(*) from report_cov_cases where lab_id in ({}) and flow_status = 2 and test_day in ({})".format(strLabId,
                                                                                                          self.date)
        COVData = self.Common.connectMySQL(COVSql)[0][0]
        # 上报机构数
        reportedLabSql = "select count(*) from report_workload_record where lab_id in ({}) and flow_status = 2 and test_day in ({})".format(
            strLabId, self.date)
        reportedLabResult = self.Common.connectMySQL(reportedLabSql)[0][0]
        print("第五分区上报机构数：" + str(reportedLabResult))
        print("第五分区的阳性数：" + str(COVData))
    def sixthArea(self):
        sixthAreaLab = []
        sixthAreaSQL = " SELECT lab_id from belong_area_region t1 join report_lab_info t2 on t1.province_code = t2.province_code " \
                       "join report_lab_info_ext t3 on t3.lab_id = t2.id " \
                       "where t2.enabled = 1 and t1.belong_area = 'belong_area_0006' and t3.public_testing_lab = 1; "
        labId = self.Common.connectMySQL(sixthAreaSQL)
        for i in range(0, len(labId)):
            # print(labId[i][0])
            sixthAreaLab.append(labId[i][0])
        # print(firstAreaLab)
        collectionSql = [
            {'$match': {'flowStatus': 2, "lab.labId": {"$in": sixthAreaLab},
                        '$and': [{'testDate': self.date}]}},
            {'$group': {'_id': 'null', 'sum': {'$sum': '$reportResult.B1'}}}, {'$sort': {'sum': 1}}]
        firstAreaWorkload = self.Common.connectMongDB(collectionSql)
        for firstAreaResult in firstAreaWorkload:
            print('第六分区检测量：' + str(firstAreaResult['sum']))
        strLabId = ",".join(str(i) for i in sixthAreaLab)  # 整数列表转换成字符串列表
        # 阳性案例
        COVSql = "select count(*) from report_cov_cases where lab_id in ({}) and flow_status = 2 and test_day in ({})".format(strLabId,
                                                                                                          self.date)
        COVData = self.Common.connectMySQL(COVSql)[0][0]
        # 上报机构数
        reportedLabSql = "select count(*) from report_workload_record where lab_id in ({}) and flow_status = 2 and test_day in ({})".format(
            strLabId, self.date)
        reportedLabResult = self.Common.connectMySQL(reportedLabSql)[0][0]
        print("第六分区上报机构数：" + str(reportedLabResult))
        print("第六分区的阳性数：" + str(COVData))
    def seventhArea(self):
        senventhAreaLab = []
        senventhAreaSQL = " SELECT lab_id from belong_area_region t1 join report_lab_info t2 on t1.province_code = t2.province_code " \
                       "join report_lab_info_ext t3 on t3.lab_id = t2.id " \
                       "where t2.enabled = 1 and t1.belong_area = 'belong_area_0007' and t3.public_testing_lab = 1; "
        labId = self.Common.connectMySQL(senventhAreaSQL)
        for i in range(0, len(labId)):
            # print(labId[i][0])
            senventhAreaLab.append(labId[i][0])
        # print(firstAreaLab)
        collectionSql = [
            {'$match': {'flowStatus': 2, "lab.labId": {"$in": senventhAreaLab},
                        '$and': [{'testDate': self.date}]}},
            {'$group': {'_id': 'null', 'sum': {'$sum': '$reportResult.B1'}}}, {'$sort': {'sum': 1}}]
        firstAreaWorkload = self.Common.connectMongDB(collectionSql)
        for firstAreaResult in firstAreaWorkload:
            print('第七分区检测量：' + str(firstAreaResult['sum']))
        strLabId = ",".join(str(i) for i in senventhAreaLab)  # 整数列表转换成字符串列表
        # 阳性案例
        COVSql = "select count(*) from report_cov_cases where lab_id in ({}) and flow_status = 2 and test_day in ({})".format(strLabId,
                                                                                                          self.date)
        COVData = self.Common.connectMySQL(COVSql)[0][0]
        # 上报机构数
        reportedLabSql = "select count(*) from report_workload_record where lab_id in ({}) and flow_status = 2 and test_day in ({})".format(
            strLabId, self.date)
        reportedLabResult = self.Common.connectMySQL(reportedLabSql)[0][0]
        print("第七分区上报机构数：" + str(reportedLabResult))
        print("第七分区的阳性数：" + str(COVData))
    def eighthArea(self):
        eighthAreaLab = []
        eighthAreaSQL = " SELECT lab_id from belong_area_region t1 join report_lab_info t2 on t1.province_code = t2.province_code " \
                       "join report_lab_info_ext t3 on t3.lab_id = t2.id " \
                       "where t2.enabled = 1 and t1.belong_area = 'belong_area_0008' and t3.public_testing_lab = 1; "
        labId = self.Common.connectMySQL(eighthAreaSQL)
        for i in range(0, len(labId)):
            # print(labId[i][0])
            eighthAreaLab.append(labId[i][0])
        # print(firstAreaLab)
        collectionSql = [
            {'$match': {'flowStatus': 2, "lab.labId": {"$in": eighthAreaLab},
                        '$and': [{'testDate': self.date}]}},
            {'$group': {'_id': 'null', 'sum': {'$sum': '$reportResult.B1'}}}, {'$sort': {'sum': 1}}]
        firstAreaWorkload = self.Common.connectMongDB(collectionSql)
        for firstAreaResult in firstAreaWorkload:
            print('第八分区检测量：' + str(firstAreaResult['sum']))
        strLabId = ",".join(str(i) for i in eighthAreaLab)  # 整数列表转换成字符串列表
        # 阳性案例
        COVSql = "select count(*) from report_cov_cases where lab_id in ({}) and flow_status = 2 and test_day in ({})".format(strLabId,
                                                                                                          self.date)
        COVData = self.Common.connectMySQL(COVSql)[0][0]
        # 上报机构数
        reportedLabSql = "select count(*) from report_workload_record where lab_id in ({}) and flow_status = 2 and test_day in ({})".format(
            strLabId, self.date)
        reportedLabResult = self.Common.connectMySQL(reportedLabSql)[0][0]
        print("第八分区上报机构数：" + str(reportedLabResult))
        print("第八分区的阳性数：" + str(COVData))

if __name__ == '__main__':
    publicLab().firstArea()
    publicLab().secondArea()
    publicLab().thirdArea()
    publicLab().fourthArea()
    publicLab().fifthtArea()
    publicLab().sixthArea()
    publicLab().seventhArea()
    publicLab().eighthArea()
