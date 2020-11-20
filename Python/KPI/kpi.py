#coding=utf-8
import requests,json,time
def GetLabCanjiaItems ():
    cclindex=8658
    day_time=time.strftime("%Y-%m-%d %H:%M:%S",time.localtime())
    make_time=day_time[8:10]
    make_time=int(make_time)
    pwd=cclindex*make_time
    data={'pwd':pwd,'cclindex':cclindex,'year':2019}
    con=requests.post('http://jxpro.app.clinet.cn/JxService.asmx/GetLabCanjiaSpecialities',data)
    response=con.text
    code=con.status_code
    a=response.split('<?xml version="1.0" encoding="utf-8"?>',1)
    b=''.join(a)
    c=b.split('<string xmlns="http://clinet.cn/">')
    # print(c)
    d=''.join(c)
    e=d.split("\r\n",1)
    del e[0]
    f=e[0]
    f=f.split('</string>')
    # print(f)
    f=''.join(f)
    # print(f)
    f_dict=json.loads(f)
    # print(f_dict)
    # print(f_dict['data'])
    # print(type(f_dict['data']))
    lab1=f_dict['data']
    # print(lab1)
    # print(type(lab1))
    # print(lab1[0])
    # labcode=[]
    return lab1
    # for i in range(0,len(lab1)):
    #     # print(lab1[i]['labindex'])
    #     labcode.append(lab1[i]['labindex'])
    # # print(labcode)
GetLabCanjiaItems()
def log(Log):
    with open('mysql_log.txt','a',encoding='utf8') as f:
        f.write(Log+'\n')