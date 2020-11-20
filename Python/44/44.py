#coding= utf-8
import numpy,datetime
# print('已成功拉取Git仓库中的代码，开始执行代码')
# # print(1)
# # print(2)
# # from selenium.webdriver.chrome.options import Options
# # import sys
# # from selenium import webdriver
# # reload(sys)
# # sys.setdefaultencoding('utf-8')
# # chrome_options = Options()
# # chrome_options.add_argument('--no-sandbox')
# # chrome_options.add_argument('--disable-dev-shm-usage')
# # chrome_options.add_argument('--headless')
# # chrome_options.add_argument('blink-settings=imagesEnabled=false')
# # chrome_options.add_argument('--disable-gpu')
# # browser = webdriver.Chrome(chrome_options=chrome_options)
# # browser.get('http://www.baidu.com')
# # title=browser.title
# # print('当前标题是：'+title)
# # print('OK')
# # print('执行完毕')
import numpy as np
from sympy import *
import math
# a =2
# b = 3
#
# print(round(a/b,2))
# x=[1,2,3]
# std = np.std(x,ddof=1)
# print(std)
# print(np.std([1,2,'x'],ddof=1))
# 解方程

# def solve(eq,var='x'):
#     eq1 = eq.replace("=","-(")+")"
#     c = eval(eq1,{var:1j})
#     print(-c.real/c.imag)
#     return -c.real/c.imag
# solve('2*x=5')
#
# x='(10+20+x)/3 + '+str(2*np.std([1,2,'x'],ddof=1))
# 一元二次
# x= symbols('x')
# a=solve(Eq(x**2+2*x+1,0),x)
# print(a)

# b = math.sqrt(((((30+x)/3 - 10)**2+((30+x)/3 - 20)**2+((30+x)/3 - 10)**2)/2))
# c = (((30+x)/3 - 10)**2+((30+x)/3 - 20)**2+((30+x)/3 - 10)**2)/2
# x = symbols('x')
# e = solve(Eq(math.sqrt(((((30+x)/3 - 10)**2+((30+x)/3 - 20)**2+((30+x)/3 - 10)**2)/2)),40),x)
# print(e)

# x = symbols('x')
# # e = solve(Eq((((30+x)/3-10)**2+((30+x)/3-10)**2+((30+x)/3-10)**2)/2,100),x)
# e=solve(Eq(((30+x)/3-10)**2+((30+x)/3-10)**2+((30+x)/3-10)**2,200),x)
# print(e)


# inputDate = input('输入检测日期，格式20201002')
# intDate = int(inputDate)
# yesterday = datetime.datetime.strptime(inputDate, "%Y%m%d")
# yesterdate = int((yesterday + datetime.timedelta(days=-1)).strftime("%Y%m%d"))
#
# print(yesterdate)
a=3212361
print(round(a/10000,0))