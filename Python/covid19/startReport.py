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


# start()
def startQuery():
    orgId = reportData.readCSV()
    # labId = "15256"
    for labId in orgId:
        print(labId)
        cookie = reportData.skipCovid(labId)
        qcId1 = reportData.queryDetectionSystem(cookie)
        print(qcId1)
        response = reportData.queryData(qcId1,cookie)
        total = response["data"]["iqcDataPages"]["total"]
        if total<90:
            reportData.writeLabId(labId)
startQuery()
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