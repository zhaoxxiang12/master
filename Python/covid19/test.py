import requests,json,time,random
## 获取跳转地址
url = "http://xinguan.pft.sh-weiyi.com/v2/open/service/perf/app/info?appKey=cov-qc&src=lab&orgId="+'2081'
headers={"Content-Type":"application/json;charset=UTF-8"}
con = requests.get(url,headers)
newUrl = con.text
# 跳转新冠质管
connection = requests.get(newUrl,headers,allow_redirects=False)
cookie = requests.utils.dict_from_cookiejar(connection.cookies)
# print(cookie)
# 查询检测体系
queryUrl = "http://covid19-qc-lab.pft.sh-weiyi.com/service/iqc/data/item-tree"
r = requests.get(queryUrl,cookies=cookie)
response = json.loads(r.text)
print(response)
groupName = response['data'][0]['children'][0]['label']
print(groupName)

qcId1 = response['data'][0]['children'][0]['children'][0]['id']
qcId2 = response['data'][1]['children'][0]['children'][0]['id']
print(qcId1,qcId2)


url1 = 'http://covid19-qc-lab.pft.sh-weiyi.com/service/testing/batch-no-group?enabled=true'
r1 =requests.get(url1,cookies = cookie)
response1 = json.loads(r1.text)
batchGroup = response1['data'][0]['groupName']
print(batchGroup)
bacthNo1 = batchGroup[0:(batchGroup.index('|'))]
bacthNo2 = batchGroup[(batchGroup.index('|')+1):]
print(bacthNo1,bacthNo2)



#质控数据上报
reportUrl = "http://covid19-qc-lab.pft.sh-weiyi.com/service/iqc/data"
data = {"labId":"1","qcItemId":qcId1,
        "levDatas":[{"batchNo":bacthNo1,"levDataId":"","result":random.randint(0,100),"qcDate":int(round(time.time() * 1000))},
         {"batchNo":bacthNo1,"levDataId":"","result":random.randint(0,100),"qcDate":int(round(time.time() * 1000))}]}

data2 = {"labId":"1","qcItemId":qcId2,
        "levDatas":[{"batchNo":bacthNo2,"levDataId":"","result":random.randint(0,100),"qcDate":int(round(time.time() * 1000))},
         {"batchNo":bacthNo2,"levDataId":"","result":random.randint(0,100),"qcDate":int(round(time.time() * 1000))}]}

response1 = requests.post(reportUrl,json=data,cookies = cookie)
response2 = requests.post(reportUrl,json=data2,cookies = cookie)
print(response1.status_code)
print(response1.text)

