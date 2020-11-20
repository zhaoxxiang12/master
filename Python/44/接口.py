# -*- coding: utf-8 -*
import requests
import json

# Login登陆


headers = {'Content-Type': 'application/json'}
url = 'http://cqb-gz.dev.sh-weiyi.com/cqb-dict-server/service/system/login'
data = {
    "kaptcha": "4434",
    "password": "dd2e745a59ede541459319696bf36d3c",
    "userName": "admin"
}
r = requests.post(url, headers=headers, data=json.dumps(data))
# cookies = r.cookies['JSESSIONID']
cookies = {'JSESSIONID':r.cookies['JSESSIONID']}
# print(cookies)
# print(url, r.status_code)
list = [
    {
        # 添加项目
        "url": 'http://cqb-gz.dev.sh-weiyi.com/cqb-dict-server/service/item',
        "data": {
            "auditStatus": 0,
            "createTime": "2019-10-11T11:34:52.510Z",
            "id": 0,
            "itemCName": "钾",
            "itemECode": "K",
            "itemEName": "K",
            "itemId": "10001",
            "remark": "string",
            "status": 1,
            "tagIds": [
                0
            ],
            "updateTime": "2019-10-11T11:34:52.510Z"
        },
        "type": "post",
        "posttype": "json"
    },
    {
        # 编辑项目
        "url": 'http://cqb-gz.dev.sh-weiyi.com/cqb-dict-server/service/item',
        "data": {
            "auditStatus": 0,
            "createTime": "2019-10-11T11:34:52.510Z",
            "id": 0,
            "itemCName": "钾",
            "itemECode": "K",
            "itemEName": "K",
            "itemId": "10001",
            "remark": "string",
            "status": 1,
            "tagIds": [
                0
            ],
            "updateTime": "2019-10-11T11:34:52.510Z"
        },
        "type": "post",
        "posttype": "json"
    },
    {
        # 搜索项目
        "url": 'http://cqb-gz.dev.sh-weiyi.com/cqb-dict-server/service/spec/allIds?tagType=false&keywords=&current=1&size=10',
        "data": {},
        "type": "get",
        "posttype": ""
    },
]

for item in list:
    if item['type'] == 'get':
        r = requests.get(item['url'], cookies=cookies)
        print(item['url'], r.status_code)
    if item['type'] == 'post':
        if item['posttype'] == 'json':
            r = requests.post(item['url'], headers=headers, cookies=cookies, data=json.dumps(item['data']))
        if item['posttype'] == 'form':
            r = requests.post(item['url'], cookies=cookies, data=item['data'])
        print(item['url'], r.status_code)
#     print(cookies)
