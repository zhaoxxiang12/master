#coding= utf-8
print('已成功拉取Git仓库中的代码，开始执行代码')
print(1)
print(2)
from selenium.webdriver.chrome.options import Options
import sys
from selenium import webdriver
reload(sys)
sys.setdefaultencoding('utf-8')
chrome_options = Options()
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_argument('--headless')
chrome_options.add_argument('blink-settings=imagesEnabled=false')
chrome_options.add_argument('--disable-gpu')
browser = webdriver.Chrome(chrome_options=chrome_options)
browser.get('http://www.baidu.com')
title=browser.title
print('当前标题是：'+title)
print('OK')
print('执行完毕')