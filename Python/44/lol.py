# 代码片段1
import urllib.request
import json
import os
import pathlib
import re
from bs4 import BeautifulSoup

# 获取ID和name，并下载


def json_txt(jsonSkinSJSON, defalut):
    jsonSkinSJSON = jsonSkinSJSON["data"]["skins"]
    i = 0
    imgId = ""
    imgName = ""
    for key in jsonSkinSJSON:
        if i == 0:
            # print(key["id"])
            imgId = key["id"]
            # print(defalut)
            imgName = defalut
            i = i + 1
        else:
            imgId = key["id"]
            imgName = key["name"]
        save_dir = 'D:\LOLheroskin\\'
        save_file_name = save_dir + imgName + ".jpg"
        urlDown = "http://ossweb-img.qq.com/images/lol/web201310/skin/big" + imgId + ".jpg"
        print(urlDown)
        try:
            if not os.path.exists(save_file_name):
                urllib.request.urlretrieve(urlDown, save_file_name)
        except Exception:
            print("下载失败")


# 获取英雄联盟皮肤


def getSkins(urlOne):
    response = urllib.request.urlopen(
        urlOne)
    data = response.read().decode('utf-8')
    # print(data)
    jsonSkin = re.findall(r"{\"data\":(.+?);", data)
    jsonSkinS = "{\"data\":" + jsonSkin[0]

    jsonSkinSJSON = json.loads(jsonSkinS)
    # print(jsonSkinSJSON["data"]["name"])
    defalut = jsonSkinSJSON["data"]["name"]

    json_txt(jsonSkinSJSON, defalut)

# 获取英雄联盟英雄列表
response = urllib.request.urlopen(
    "http://lol.qq.com/biz/hero/champion.js")

data = response.read().decode('utf-8')

json1 = re.findall(r"LOLherojs.champion=(.+?);", data)

hero_json = json.loads(json1[0])['keys']

c = []
for key in hero_json:
    # print("****key--：%s value--: %s" % (key, hero_json[key]))
    url_skin = "http://lol.qq.com/biz/hero/" + hero_json[key] + ".js"
    c.append(url_skin)

# 文件夹不存在则创建
save_dir = 'D:\LOLheroskin\\'
if not os.path.exists(save_dir):
    os.mkdir(save_dir)

for heroOne in c:
    getSkins(heroOne)
print("下载完成")
