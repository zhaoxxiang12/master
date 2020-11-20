import pymongo, datetime,pymysql

nationDetection = []
count = []
totalDetection = 0
yesterdayTotal = 0
dict={}
# inputDate = input('输入检测日期，格式20201002')
# intDate = int(inputDate)
# yesterday = datetime.datetime.strptime(inputDate, "%Y%m%d")
# yesterday = int((yesterday + datetime.timedelta(days=-1)).strftime('%Y%m%d'))
mongoCon = pymongo.MongoClient('8.129.173.137', 27017)
mydb = mongoCon['cov_report_test']
mydb.authenticate('cov_report_test', 'test_udRQIHuW7v')
mycol = mydb['workload_report']
# mysql
dataBase = 'cov_report_test'
host = '8.129.173.137'
userName = 'cov_report_test'
passWord = 'test_udRQIHuW7v'
con = pymysql.connect(host=host, port=3306, user=userName, password=passWord, database=dataBase)
cursor = con.cursor()
# collectionSql = [{'$match': {'testDate': intDate, 'flowStatus': 2, '$or': [{'lab.instFunction': 'inst_function_0002'}, {
#     'lab.instFunction': 'inst_function_0003'}]}},
#                  {'$group': {'_id': '$lab.provinceCode', 'sum': {'$sum': '$reportResult.B1'}}}, {'$sort': {'sum': - 1}}]
# mongoResult = mycol.aggregate(collectionSql)
# for i in mongoResult:
#     # print(i)
#     nationDetection.append(i['sum'])
# for totalNationdetection in nationDetection:
#     totalDetection = totalDetection + totalNationdetection
# count.append(totalDetection)
# nationDetection.clear()
# print(count)
# # 上一日
# collectionYesterdaysql = [{'$match': {'testDate': yesterday, 'flowStatus': 2, '$or': [{'lab.instFunction': 'inst_function_0002'}, {
#     'lab.instFunction': 'inst_function_0003'}]}},
#                  {'$group': {'_id': '$lab.provinceCode', 'sum': {'$sum': '$reportResult.B1'}}}, {'$sort': {'sum': - 1}}]
# yesterdayResult = mycol.aggregate(collectionYesterdaysql)
# for j in yesterdayResult:
#     # print(j)
#     nationDetection.append(j['sum'])
# for totalNationdetection in nationDetection:
#     yesterdayTotal =  yesterdayTotal + totalNationdetection
# count.append(yesterdayTotal)
# print(count)
# print(count[0]-count[1])
# 第三方实验室检测量
mongoProvince=[]
mysqlProvince=[]
provinceData=[]
thirdLabcollection = [{
    '$match': {
        'flowStatus': 2,
        'lab.instCategory': 'inst_category_0003',

        '$and': [{'testDate': 20201002}
                 ]}}, {'$group': {
    '_id': '$lab.provinceCode',
    'sum': {
        '$sum': '$reportResult.B1'
    }
}
},
    {
        '$sort': {
            '_id': -1
        }
    }]
mongoResult = mycol.aggregate(thirdLabcollection)
for i in mongoResult:
    # print(i)
    mongoProvince.append(i['_id'])
    provinceData.append(i['sum'])
sql="select province_code from common_province order by province_code desc "
cursor.execute(sql)
result = cursor.fetchall()
con.commit()
for i in range(0, len(result)):
    mysqlProvince.append(result[i][0])
c= [x for x in mongoProvince if x in mysqlProvince]
d = [y for y in (mongoProvince + mysqlProvince) if y not in c]
# print(c)
for i in range(0,len(c)):
    dataProvinceSql="select province_name from common_province where province_code =%s"%(c[i])
    cursor.execute(dataProvinceSql)
    result3 = cursor.fetchall()
    con.commit()
    provinceName=result3[0][0]
    dict[provinceName]=provinceData[i]
# print(dict)
print(sorted(dict.items(),key=lambda x:x[1],reverse=True))
# print(d)
# 去除港澳台
# d=['820000', '810000', '710000', '660000', '640000', '540000']
# specialProvince=['710000','810000','820000']
# for i in range(0,len(specialProvince)):
#     if specialProvince[i] in d:
#         d.remove(specialProvince[i])
# print(d)
# 添加没有检测量的省份到字典
# for j in range(0,len(d)):
#     noDataprovindeSql= "select province_name from common_province where province_code =%s"%(d[j])
#     cursor.execute(noDataprovindeSql)
#     result2 = cursor.fetchall()
#     con.commit()
#     provinceName=result2[0][0]
#     dict[provinceName]=0
# print(dict)
