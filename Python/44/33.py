#coding= utf-8
from selenium import webdriver
import urllib.request
import json
import os
import pathlib
import re
from bs4 import BeautifulSoup
# print(1)
# print(2)
# driver=webdriver.Chrome()
# driver.get('http://www.baidu.com')
# title=driver.title
# print(title)

# Skins 列表




# 获取英雄列表
response = urllib.request.urlopen('http://lol.qq.com/biz/hero/champion.js')
data = response.read().decode('utf-8')
# print(data)
json1 = re.findall(r"LOLherojs.champion=(.+?);",data)
# print(json1)
heroJson = json.loads(json1[0])['keys']
print(heroJson)
heroList=[]
for key in heroJson:
    urlSkin = "http://lol.qq.com/biz/hero/" + heroJson[key] + ".js"
    heroList.append(urlSkin)
print(heroList)
# 文件夹不存在则创建
# savePath = 'F:\file\Spider\\'
# if not os.path.exists(savePath):
#     os.mkdir(savePath)
# for heroOne in heroList:
#     print(1)
# print('Success')