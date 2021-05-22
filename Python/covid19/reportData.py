import requests,json,time,random,csv
def skipCovid(id):
    ## 获取跳转地址
    url = "http://xinguan.pft.sh-weiyi.com/v2/open/service/perf/app/info?appKey=cov-qc&src=lab&orgId="+id
    headers={"Content-Type":"application/json;charset=UTF-8"}
    con = requests.get(url,headers)
    newUrl = con.text
    # 跳转新冠质管
    connection = requests.get(newUrl,headers,allow_redirects=False)
    cookie = requests.utils.dict_from_cookiejar(connection.cookies)
    return cookie
 # 查询检测体系
def queryDetectionSystem(cookie):
    queryUrl = "http://covid19-qc-lab.pft.sh-weiyi.com/service/iqc/data/item-tree"
    r = requests.get(queryUrl,cookies=cookie)
    response = json.loads(r.text)
    # try:
    #     qcId1 = response['data'][0]['children'][0]['children'][0]['id']
    #     qcId2 = response['data'][1]['children'][0]['children'][0]['id']
    #     return qcId1,qcId2
    # except Exception as e:
    #     pass
    return response
def reportData(labId,qcId1,bathNo1,qcId2,bathNo2,cookie):
    #质控数据上报
    reportUrl = "http://covid19-qc-lab.pft.sh-weiyi.com/service/iqc/data"
    data = {"labId":labId,"qcItemId":qcId1,
            "levDatas":[{"batchNo":bathNo1,"levDataId":"","result":random.randint(1,100),"qcDate":int(round(time.time() * 1000))},
             {"batchNo":bathNo1,"levDataId":"","result":random.randint(1,100),"qcDate":int(round(time.time() * 1000))}]}

    data2 = {"labId":labId,"qcItemId":qcId2,
            "levDatas":[{"batchNo":bathNo2,"levDataId":"","result":random.randint(1,100),"qcDate":int(round(time.time() * 1000))},
             {"batchNo":bathNo2,"levDataId":"","result":random.randint(1,100),"qcDate":int(round(time.time() * 1000))}]}
    response1 = requests.post(reportUrl,json=data,cookies = cookie)
    response2 = requests.post(reportUrl,json=data2,cookies = cookie)
    # print(response1.status_code)
    print(response1.text)
    print(response2.text)

## 读取csv文件数据
def readCSV():
    orgId = []
    path = "E:\PrivateFile\master\Python\covid19\查询实验室 - 5.csv"
    ## 读取某列的数据
    with open(path, 'r') as f:
        reader = csv.reader(f)
        rows = [row for row in reader]
        for i in range(1, len(rows)):
            orgId.append(rows[i][0])
    return orgId

#查询质控组合
def queryBacthGroup(cookie):
    url = 'http://covid19-qc-lab.pft.sh-weiyi.com/service/testing/batch-no-group?enabled=true'
    r1 = requests.get(url, cookies=cookie)
    response1 = json.loads(r1.text)
    batchGroup = response1['data'][0]['groupName']
    bacthNo1 = batchGroup[0:(batchGroup.index('|'))]
    bacthNo2 = batchGroup[(batchGroup.index('|') + 1):]
    return bacthNo1,bacthNo2

def writeLabId(labId):
    path = "E:\PrivateFile\master\Python\covid19\LabId.txt"
    with open (path,'a') as f:
        f.write(labId+"\n")

def queryData(qcId,cookie):
    url = "http://covid19-qc-lab.pft.sh-weiyi.com/service/iqc/data/page?qcItemId="+qcId+"&current=1&size=100"
    r = requests.get(url,cookies = cookie)
    response = json.loads(r.text)
    return response