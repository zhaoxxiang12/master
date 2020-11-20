import re
import os, shutil
import requests, threading
from urllib.request import urlretrieve
from pyquery import PyQuery as pq
from multiprocessing import Pool


class video_down():
    def __init__(self, url):
        # 拼接url
        self.api = 'https://jx.618g.com'
        self.getUrl = 'https://jx.618g.com/?url=' + url
        # 设置UA模拟浏览器访问
        self.head = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) '
                                   'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'}
        # 设置线程数据量
        self.thread_num = 32
        # 设置当前文件下载数量
        self.i = 0
        # 调用网页获取
        html = self.getPage(self.getUrl)
        if html:
            # 解析网页
            self.parsePage(html)

    def getPage(self, getUrl):
        try:
            print('正在请求目标网页.......')
            response = requests.get(getUrl, head=self.head)
            if response.status_code == 200:
                print('网页请求成功......\n 准备解析')
                self.head['referer'] = getUrl
                return response.text
        except Exception:
            print('请求目标网页失败,请重试')
            return None

    def parsePage(self, html):
        print('目标信息正在解析.....')
        doc = pq(html)
        self.title = doc('head title').text()
        print(self.title)
        url = doc('#player').attr('src')[14:]
        html = self.get_m3u8_1(url).strip()
        self.url = url[:-10] + html
        print(self.url)
        print('解析完成,获取缓存ts文件')
        self.get_m3u8_2(self.url)

    def get_m3u8_1(self, url):
        try:
            response = requests.get(url, headers=self.head)
            html = response.text
            print('获取ts文件成功')
            return html[-20:]
        except Exception:
            print('缓存文件错误')

    def get_m3u8_2(self, url):
        try:
            response = requests.get(url, headers=self.head)
            html = response.text
            print('获取ts文件成功，准备提取信息')
            self.parsePage(html)
        except Exception:
            print('缓存文件错误')

    def parse_ts_2(self, html):
        pattern = re.compile('.*?(.*?).ts')
        self.ts_lists = re.findall(pattern, html)
        print('信息提取完成...........\n 准备下载')
        self.pool()

    def pool(self):
        print('经计算需要下载%d个文件' % len(self.ts_lists))
        self.ts_url = self.url[:-10]
        if self.title not in os.listdir:
            os.makedirs(self.title)
        print("正在下载...........所需时间较长，请等待")
        pool = Pool(16)
        pool.map(self.save_ts, [ts_list for ts_list in self.ts_lists])
        pool.close()
        pool.join()
        print('下载完成')
        self.ts_to_mp4()

    def ts_to_mp4(self):
        print('ts文件正在转换MP4.............')
        str = 'copy /b' + self.title + '\*.ts' + self.title + '.mp4'
        os.system(str)
        filename = self.title + '.mp4'
        if os.path.isfile(filename):
            print('转换完成')
            shutil.rmtree(self.title)

    def save_ts(self, ts_list):
        try:
            ts_urls = self.ts_url + '{}.ts'.format(ts_list)
            self.i += 1
            print('当前进度%d%d' % (self.i, len(self.ts_lists)))
            urlretrieve(url=ts_urls, filename=self.title + '/{}.ts'.format(ts_list))
        except Exception:
            print('保存文件出错')

    if __name__ == '__main__':
        # 电源目标url
        url = 'https://v.qq.com/x/cover/5c58griiqftvq00.html'

