import sys
import time


class studetn:
    # 定义一个类名为studetn
    def __init__(self,idx):
    # 定义初始化构造，这里使用init，还有别的属性比如reversed，iter之类的
        self.idx=idx
        # 初始化变量，方便继承
    def runx(self):
    # 定义运行函数，从上面继承变量
        print (self.idx)
        # 打印出idx的值，或者做一些别的处理
        time.sleep(1)
a=studetn('a')
a.runx()