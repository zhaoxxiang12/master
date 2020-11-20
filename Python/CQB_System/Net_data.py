# coding=utf-8
from selenium.webdriver.common.by import By#引入判断元素加载模块
from selenium.webdriver.support.ui import WebDriverWait#引入判断元素加载模块
from selenium.webdriver.support import expected_conditions as Ec#引入判断元素加载模块
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
import requests
import xlwt
import datetime
import unittest
import time

class Spider(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver=webdriver.Chrome()
        cls.driver.maximize_window()
        cls.driver.get('http://cqb-lab.test.sh-weiyi.com/cqb-base-gz-fe/app.html')
        time.sleep(2)
        cls.driver.find_element_by_xpath('/html/body/div[2]/div/div[3]/button[1]').click()
        cls.driver.find_element_by_xpath('//*[@id="app"]/div/div[2]/div/form/div[1]/div/div[1]/input').send_keys('gd18080')
        cls.driver.find_element_by_xpath('//*[@id="app"]/div/div[2]/div/form/div[2]/div/div[1]/input').send_keys('gd18080')
        cls.driver.find_element_by_xpath('//*[@id="app"]/div/div[2]/div/form/div[3]/div/div[1]/input').send_keys('1')
        cls.driver.find_element_by_xpath('//*[@id="app"]/div/div[2]/div/form/div[5]/div/button').click()
        time.sleep(2)
        cls.driver.find_element_by_xpath('//*[@id="app"]/div/div[1]/div[1]/div[1]/div[4]/a/div[2]/span[1]/i').click()
    def test_01(self):
        print(1)
    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
if __name__ == '__main__':
    Spider()