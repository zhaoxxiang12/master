import pymongo,datetime
# a=[1,2,3,4,5]
# # total=0
# # for i in a:
# #     total=total+i
# # print(total)
# a=['19589']
# print(a[0])

# print(type(a))
# a='20201001'
# a=datetime.datetime.strptime(a,"%Y%m%d")
# print(a)
# b = (a+datetime.timedelta(days = -1)).strftime('%Y%m%d')
# # b=b.strftime('%Y%m%d')
# print(b)

# from dateutil.relativedelta import relativedelta
# d = datetime.datetime.strptime('20180131', '%Y%m%d')
# print(d) ## 2018-01-31 00:00:00
# print((d - relativedelta(date=1)).strftime('%Y%m%d'))

# inputDate = input('输入检测日期，格式20201002')
# # intDate = int(inputDate)
# yesterday = datetime.datetime.strptime(inputDate, "%Y%m%d")
# # print(yesterday)
# yesterdate = (yesterday + datetime.timedelta(days = -1)).strftime('%Y%m%d')
# print(yesterdate)
# 字典键值key排序
# dict={}
# dict[2] = 56
# dict[1] = 2
# dict[5] = 12
# dict[4] = 24
# dict[6] = 18
# dict[3] = 323
# print(dict)
# for i in sorted(dict):
#     print(i,dict[i])
#
d = {'650000':25, '370000':21,  '440000':19}
# 按key:value中的key排序
a=sorted(d.items(),key=lambda item:item[0], reverse=False)
print(a)
# 列表转字典
newdict={}
for i in a:
    newdict[i[0]]=i[1]
print(newdict)
# 按key:value中的value排序排序：
# c=sorted(d.items(),key=lambda item:item[1], reverse=False)
# 按key:value中的value排序排序：
#
# sorted(d.items(),key=lambda item:item[1], reverse=True/False) 输出[(key,value), (key,value)]的排序

# print(c)
# b = sorted(d.items())
# print(a)
# 字典value排序
dict={}
dict[2] = 56
dict[1] = 2
dict[5] = 12
dict[4] = 24
dict[6] = 18
dict[3] = 323
print(dict)

#  提取字典中的key
# for key in dict.keys():
#     print(key)



# print(sorted(dict.items(),key=lambda x:x[1],reverse=True))

#遍历替换key
# a = {'a':1,'b':2,'c':3}
# c = ['d','f','g']
# count = 0
# a['a'] = a.pop(c[0])
# print(a)
# a[c[0]]=a.pop('a')
# print(a)

# for i in range(0,len(c)):
#     print(i)

# for key in a.keys():
#     a[c[count]] =a.pop(key)
#     # print(a)
#     count = count + 1
# print(a)
count = 0
de={}
newProvincedata ={'370000': 64064, '440000': 128687, '650000': 472716}
provinceName = ['山东省', '广东省', '新疆维吾尔自治区']
for key in newProvincedata:
    newProvincedata[provinceName[count]] = newProvincedata.pop(key)
    count =count +1
# print(newProvincedata)

newData = sorted(newProvincedata.items(), key=lambda item: item[1], reverse=True)
for i in newData:
    de[i[0]] = i[1]
for j in de.values():
    print(j)
# print(de)

