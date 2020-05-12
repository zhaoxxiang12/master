#coding=utf-8
import requests,json,time,os
from kpi import GetLabCanjiaItems,log
# pwd=input('输入pwd')
def Count_Major():
    lab1=GetLabCanjiaItems()
    cclindex = 8658
    day_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    make_time = day_time[8:10]
    make_time = int(make_time)
    pwd = cclindex * make_time
    standard='合格'
    Count=0
    # print(lab1)
    for i in range(0,len(lab1)):
        # major_number=lab1[i]#专业编码
        major_number=lab1[i]['specialities']
        # print(major_number)
        lab_number=lab1[i]['labindex']#实验室编码
        # # print(lab_number)
        for j in range(0,len(major_number)):
            lab_number2=major_number[j]
            print(lab_number2)
            print(lab_number)
            # time.sleep(2)
            data={'pwd':pwd,'cclindex':cclindex,'year':2019,'speciality':lab_number2}
            # print(lab_number2)
            con=requests.post('http://jxpro.app.clinet.cn/JxService.asmx/GetLabItemPass',data)
            response=con.text
            # print(response)

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
            time.sleep(2)
            # print(f_dict)
            data2=f_dict['data']
            # print(data2)
            if j!=len(major_number)-1:
                print('统计未完成')
                if data2==[]:
                    print('没有返回数据')
                    Count=Count+0
                else:
                    for k in range(0,len(data2)):
                        if data2[k]['实验室编码']==lab_number and data2[k]['是否及格']==standard:
                            Count+=1
                    print(Count)
            else:
                Log=lab_number+'实验室合格项目数已统计完成,合格项目数为'+str(Count)
                print(lab_number+'实验室合格项目数已统计完成,合格项目数为'+str(Count))
                print(Count)
                Count=0
                log(Log)
                print('开始统计下一个实验室')

            # os.system('pause')
Count_Major()










