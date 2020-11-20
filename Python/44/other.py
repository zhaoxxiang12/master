import json
import os
import re
import random
import requests
from requests.exceptions import RequestException

file_path = 'F:\\file\Spider'


# 获取全部英雄对象json
def heroJson():
    try:
        heroURL = 'https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js'
        response = requests.get(heroURL)
        responseText = json.loads(response.text)
        # print(responseText)
        print('版本', responseText.get('version'))
        print('文件名', responseText.get('fileName'))
        print('文件更新', responseText.get('fileTime'))
        print('英雄数量', responseText.get('hero'))
        for i in responseText.get('hero'):
            heroId = i.get('heroId')
            # print(heroId)
            # loadHeroskin(heroId)
    except RequestException:
        return None


#  皮肤 地址 https://game.gtimg.cn/images/lol/act/img/skin/big1001.jpg
# 地址 https://game.gtimg.cn/images/lol/act/img/js/hero/1.js  因为所有数据包括皮肤图片都在这个地址里面
def loadHeroskin(heroId):
    heroImgurl = 'https://game.gtimg.cn/images/lol/act/img/js/hero/'
    heroImgurlsuffix = '.js'
    response = requests.get(heroImgurl + heroId + heroImgurlsuffix)
    html = json.loads(response.text)  # 数据以json格式返回
    skinsLists = html.get('skins')
    print(skinsLists)
    # print(heroImgurl+heroId+heroImgurlsuffix)
    # print(html)
    heroLickname = html.get('hero').get('name')
    # print(heroLickname)
    heroRealname = html.get('hero').get('title')
    # print(heroRealname)
    # heroLickname = handle_str(heroLickname)
    skinsPath = file_path + '\\' + heroLickname + '  ' + heroRealname
    if not os.path.exists(skinsPath):
        print('文件不存在，创建中')
        os.mkdir(skinsPath,755)
    for skin in skinsLists:
        skinName = skin['name']  # 皮肤名字
        # print(skinName)
        linkURL = skin['mainImg']  # 皮肤链接地址
        skinChrmas = skin['chromas']  # 是否是炫彩皮肤，0表示否  1表示是
        # print(skinChrmas)
        # if skinChrmas == '0':
        #     download(linkURL, skinsPath, skinName)
        download(linkURL, skinsPath, skinName)

# 下载图片
def download(imgURL, filePath, skinName):
    r = requests.get(imgURL, stream=True)
    print(skinName, r.status_code)  # 返回状态码
    if r.status_code == 200:
        open( filePath+ '\\' + skinName + '.jpg', 'wb').write(r.content)  # 将内容写入图片
        print(imgURL + '下载成功')
    del r


loadHeroskin('105')
