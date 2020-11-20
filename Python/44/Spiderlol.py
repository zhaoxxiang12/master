import requests
import os
import json
import re


def getHTML(url):
    try:
        response = requests.get(url)
        # 判断网络状态
        response.raise_for_status()
        response.encoding = response.apparent_encoding
    except:
        print(url + '爬取失败，可能网络不稳定或者地址不正确')
    else:
        responseText = response.text
        getInfo(responseText)


def getInfo(res):
    lists = re.findall(r'"keys":(.*?),"data"', res)
    # print(lists)
    heroId = json.loads(lists[0])
    # print(heroId)
    for hero in heroId.values():
        getSkins(hero)


def getSkins(hero):
    url = 'http://lol.qq.com/biz/hero/' + hero + '.js'
    try:
        r = requests.get(url)
        r.raise_for_status()
        r.encoding = r.apparent_encoding
    except:
        print('Faile' + url)
    else:
        html = r.text
        num = re.findall(r'"id":"(\d{4,6})","num"', html)
        for i in range(len(num)):
            img_url = 'http://game.gtimg.cn/images/lol/act/img/skin/big' + num[i] + '.jpg'
            save_img(hero, img_url)


def save_img(hero, img_url):
    root = hero + "\\"
    path = root + img_url.split('/')[-1]
    try:
        if not os.path.exists(root):
            os.mkdir(root)
        if not os.path.exists(path):
            r = requests.get(img_url)
            with open(path, 'wb') as f:
                f.write(r.content)
                f.close()
                print('文件保存成功')
        else:
            print('文件已存在')
    except:
        print('爬取失败')
    print(img_url + '已下载')


def main():
    url = 'http://lol.qq.com/biz/hero/champion.js'
    getHTML(url)


if __name__ == '__main__':
    main()
