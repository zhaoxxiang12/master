# coding=utf-8
# !/usr/bin/env python
# -*- coding: UTF-8 -*-
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
import openpyxl
import sys
import datetime
import importlib
import xlwt
import xlrd

url = "https://mtj.baidu.com/data/mobile/device"


def wait(class_name):
    for trytimes in range(0, 10):
        # noinspection PyBroadException
        try:
            browser.find_element_by_class_name(class_name).click()
            break
        except Exception:
            time.sleep(0.5)


def waits(class_name):
    for trytimes in range(0, 10):
        # noinspection PyBroadException
        try:
            element = browser.find_elements_by_class_name(class_name)
            break
        except Exception:
            time.sleep(10)
    return element


def save_data(dict):
    fileName = u'百度研究学院移动平台.xls'

    # 新建新的Excel文档
    wb = xlwt.Workbook(encoding='utf-8')

    for d in dict:
        sheet = wb.add_sheet(d, cell_overwrite_ok=True)
        headlist = [d, '占比']
        row = 0
        col = 0
        for head in headlist:
            sheet.write(col, row, head)
            row += 1

        i = 0
        for data in dict[d]:
            if (i % 2 == 0):
                col += 1
            sheet.write(col, i % 2, data)
            i += 1
    wb.save(fileName)


def wait_refresh():
    try:
        browser.refresh()  # 刷新方法 refresh
        print('test pass: refresh successful')
        time.sleep(1)
    except Exception as e:
        print("Exception found", format(e))


def get_data():
    # 保存5个类别的数据，list_button中是class_name
    list_button = ['icon-brand', 'icon-device', 'icon-os', 'icon-screen', 'icon-network']

    # 字典保存所有数据
    icon_brand = []
    icon_device = []
    icon_os = []
    icon_screen = []
    icon_network = []
    dict = {"icon-brand": icon_brand, "icon-device": icon_device, "icon-os": icon_os, "icon-screen": icon_screen,
            "icon-network": icon_network}

    # 分别点击5个按钮，保存数据,品牌，机型，系统分辨率，联网
    for button in list_button:
        print("************", button, "********************")

        wait(button)
        time.sleep(2)
        element_name = browser.find_elements_by_class_name('dtd1')
        element_rank = browser.find_elements_by_class_name('dtd3')

        name_list = []
        rank_list = []
        listen = len(element_name)

        for name in element_name:
            print(element_name)

            name_list.append(name.get_attribute('textContent'))

            # print(name.get_attribute('textContent'))

        for rank in element_rank:
            rank_list.append(rank.get_attribute('textContent'))

        for i in range(0, listen):
            dict[button].append(name_list[i])
            dict[button].append(rank_list[i])
    print(dict)
    return dict


######################################################################################

# 打开浏览器
browser = webdriver.Chrome()

# 最大化窗口
browser.maximize_window()

# 输入网址
browser.get(url)

# 获取数据
dict_data = get_data()

# 写入表格
importlib.reload(sys)
save_data(dict_data)
