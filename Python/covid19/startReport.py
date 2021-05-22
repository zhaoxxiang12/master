from covid19 import reportData
import threading

def start():
    orgId = reportData.readCSV()
    for id in orgId:
        cookie = reportData.skipCovid(id)
        print(id)
        qcId1,qcId2 = reportData.queryDetectionSystem(cookie)
        batchNo1,batchNo2 =   reportData.queryBacthGroup(cookie)
        for i in range(1,91):
            reportData.reportData(id,qcId1,batchNo1,qcId2,batchNo2,cookie)


start()


# def start1():
#     orgId = reportData.readCSV()
#     Id = '481'
#     cookie = reportData.skipCovid(Id)
#     print(cookie)
#     qcId1,qcId2 = reportData.queryDetectionSystem(cookie)
#     batchNo1,batchNo2 = reportData.queryBacthGroup(cookie)
#     print(qcId1,qcId2)
#     print(batchNo1,batchNo2)
#     # for i in range(1,91):
#     reportData.reportData(Id,qcId1,qcId2,batchNo1,batchNo2,cookie)
# start1()