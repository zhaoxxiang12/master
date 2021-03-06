import unittest
from HTMLTestRunner import HTMLTestRunner
import time
from selenium import webdriver

class Test(unittest.TestCase):
    # 用于测试用例执行前的初始化工作
    def setUp(self):
        print("test start")

    def test_bbb(self):
        print("test bbb")

    def test_aaa(self):
        print("test aaa")
        # 用于测试用例执行之后的善后工作

    def tearDown(self):
        print("test end")


if __name__ == '__main__':
    suite = unittest.TestSuite()
    suite.addTest(Test("test_bbb"))
    suite.addTest(Test("test_aaa"))
    now = time.strftime("%Y-%m-%d %H_%M_%S")
    # 定义报告存放路径
    filename = 'D:\ ' + now + 'result.html'
    fp = open(filename, 'wb')
    # 定义测试报告
    runner = HTMLTestRunner(stream=fp, title='测试报告', description='用例执行情况：')
    runner.run(suite)
    fp.close()# 关闭文件流，不关的话生成的报告是空的
