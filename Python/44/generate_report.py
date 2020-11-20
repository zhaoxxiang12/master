import unittest,pytest
import allure


class testAllure(unittest.TestCase):
    @allure.feature('一级标签')
    @allure.story('二级标签')
    @allure.title('测试用例标题')
    @allure.description('用例描述')
    @allure.step('步骤')
    @allure.severity(allure.severity_level)#测试用例级别
    @allure.link(url='http://www.baidu.com',name='link_url')
    @allure.issue(url='http://www.baidu.com',name='issue_url')#bug链接
    @allure.testcase(url='http://www.tapd.com',name='testcase_url')
    def test_01(self):
        print(1)
        with open('E:\\picture\\test.jpg','rb') as f:
            file = f.read()
            allure.attach(file,'picture',allure.attachment_type.JPG)
        assert 1>2
    def test_02(self):
        print(2)
if __name__ == '__main__':
    unittest.main(['-s','generate_report.py','-q','--alluredir','./report/xml'])