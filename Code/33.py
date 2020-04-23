#coding= utf-8
print('开始执行python代码')
print(1)
print(2)
try:
    from selenium import webdriver
    driver = webdriver.Chrome()
    driver.maximize_window()
except:
    print('出错')