# coding=utf-8

import requests,json
data={
    "userName":"admin",
    "password":"dd2e745a59ede541459319696bf36d3c",
    "smsCode":" ",
    "kaptcha":"2"
}
headers={"Content-Type":"application/json;charset=UTF-8"}
url='http://cqb-mgr.test.sh-weiyi.com/cqb-base-mgr/service/system/mgr/login'
data2=json.dumps(data)
con=requests.post(url=url,data=data2,headers=headers)
print(con.text)
print(type(data))
